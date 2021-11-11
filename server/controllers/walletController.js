const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { ReasonPhrases, StatusCodes, getReasonPhrase, getStatusCode } = require('http-status-codes');
const httpResponse = require('../utils/response');
const indexService = require('../services/indexService')
const settings = require('../config/settings')
const { convertCashToKobo, convertCashToNaira } = require('../utils/helper');
const { processCreditPayment, createPaystackCustomer, getTransactionLogs } = require('../utils/paystack')

class WalletController {

    async fundWalletWithCard(req, res) {
        let { amount } = req.body
        const { fundType, birthday, cvv, cardNumber, expiryMonth, expiryYear } = req.body
        const { id } = req.decodedUserData;

        amount = convertCashToKobo(amount).data
        // gets user wallet
        const userWallet = await indexService.getUsersWallet(id)
        if (!userWallet) {
            return httpResponse.errorResponse(res, `user does not have a wallet`, StatusCodes.BAD_REQUEST)
        }
        if (userWallet.dataValues.isDeleted == true) {
            return httpResponse.errorResponse(res, `user's wallet is not active`, StatusCodes.BAD_REQUEST)
        }

    }

    async fundWalletViaTransfer(req, res) {
        let { amount } = req.body
        const { accountNumber, birthday, bankCode, fundType } = req.body;
    }
    async fundWallet(req, res) {
        try {
            let { amount, fundType } = req.body
            const { accountNumber, birthday, bankCode, cvv, cardNumber, expiryMonth, expiryYear } = req.body;
            const { id, name, email } = req.decodedUserData;
            fundType = fundType.toLowerCase().trim()
            amount = convertCashToKobo(amount).data
            let user = {
                name, email, id
            }
            // gets user wallet
            const userWallet = await indexService.getUsersWallet(id)
            // console.log('userWallet userWallet>>>', userWallet.dataValues)
            if (!userWallet) {
                return httpResponse.errorResponse(res, `user does not have a wallet`, StatusCodes.BAD_REQUEST)
            }
            if (userWallet.dataValues.isDeleted == true) {
                return httpResponse.errorResponse(res, `user's wallet is not active`, StatusCodes.BAD_REQUEST)
            }
            switch (fundType) {
                case 'card': {
                    if (!cvv) return httpResponse.errorResponse(res, `cvv code is required`, StatusCodes.BAD_REQUEST)
                    const paymentDetails = { cvv, cardNumber, expiryMonth, expiryYear };
                    const paymentData = await processCreditPayment(user, amount, fundType, paymentDetails)
                    if (paymentData.status == false) return httpResponse.errorResponse(res, `${paymentData.message}`, StatusCodes.BAD_REQUEST)

                    switch (paymentData.data.status) {
                        case 'success': {
                            userWallet.availableBalance = Number(userWallet.availableBalance);
                            userWallet.availableBalance += amount;
                            userWallet.userId = id;
                            // const transactionData = payStack.getTransactionLogs(paymentData, user, userWallet, fundType, amount);
                            const transactionData = await getTransactionLogs(paymentData, user, userWallet, fundType, amount);
                            transactionData.data.meta.comment = `NGN ${convertCashToNaira(amount).data} is added in to your wallet`
                            transactionData.data.status = "COMPLETED";
                            transactionData.data.type = "CREDIT";
                            let obj = {
                                transactionAmount: transactionData.data.amount,
                                transactionType: transactionData.data.type,
                                fundedWith: transactionData.data.channel,
                                transactionStatus: transactionData.data.status,
                                walletId: userWallet.id
                            }
                            // creates transaction log details
                            const transactionLogDetails = await indexService.createTransactionLog(obj)
                            let walletVal = {
                                availableBalance: Number(userWallet.availableBalance),
                                id: userWallet.id
                            }
                            const saveWallet = await indexService.fundWallet(walletVal)
                            userWallet.availableBalance = convertCashToNaira(userWallet.availableBalance).data
                            const data = {
                                transactionId: transactionLogDetails.dataValues.id,
                                displayText: paymentData.data.message || 'payment successful',
                                status: paymentData.data.status,
                                availableBalance: Number(userWallet.availableBalance),
                                walletId: userWallet.id,
                                userId: userWallet.userId
                            }
                            return httpResponse.successResponse(res, { data }, `NGN ${convertCashToNaira(amount).data} was added to wallet`, StatusCodes.OK)
                        }
                        case ('send_otp' || 'send_pin'): {
                            const transactionData = await getTransactionLogs(paymentData, user, userWallet, fundType, amount);
                            transactionData.data.status = "PENDING";
                            transactionData.data.meta.comment = transactionData.data.meta.comment ? transactionData.data.meta.comment : 'transaction is pending'
                            transactionData.data.type = "CREDIT";

                            // creates transaction log details
                            console.log('>>> transactionData.data', transactionData.data)
                            const transactionLogDetails = await indexService.createTransactionLog(transactionData.data)
                            const data = {
                                transactionId: transactionLogDetails.dataValues.id,
                                displayText: paymentData.data.message,
                                status: paymentData.data.status,
                                userWallet,
                            }
                            return httpResponse.successResponse(res, { data }, paymentData.data.display_text, StatusCodes.OK)
                        }
                        case ('failed'): { //paymentData.data.status === "failed"
                            const transactionData = await getTransactionLogs(paymentData, user, userWallet, fundType, amount);
                            transactionData.data.meta.comment = transactionData.data.meta.comment ? transactionData.data.meta.comment : 'transaction failed'
                            transactionData.data.status = "FAILED";
                            transactionData.data.type = "CREDIT";
                            const transactionLogDetails = await indexService.createTransactionLog(transactionData.data)
                            const data = {
                                transactionId: transactionLogDetails.dataValues.id,
                                displayText: paymentData.data.message,
                                status: paymentData.data.status,
                                userWallet,
                            }
                            return httpResponse.successResponse(res, { data }, paymentData.data.display_text, StatusCodes.OK)

                        }
                        default: {
                            const transactionData = getTransactionLogs(paymentData, user, userWallet, fundType, amount);
                            transactionData.data.meta.comment = transactionData.data.meta.comment ? transactionData.data.meta.comment : 'transaction failed'
                            transactionData.data.status = "FAILED";
                            transactionData.data.type = "CREDIT";
                            const transactionLogDetails = await indexService.createTransactionLog(transactionData.data)
                            const data = {
                                transactionId: transactionLogDetails.dataValues.id,
                                displayText: paymentData.data.message,
                                status: paymentData.data.status,
                                userWallet,
                            }
                            return httpResponse.errorResponse(res, `${transactionData.data.meta.comment}`, StatusCodes.BAD_REQUEST)

                        }
                    }
                }
                case 'bank': {

                    break;
                }
                default: {
                    return httpResponse.errorResponse(res, `transaction fund type is invalid`, StatusCodes.BAD_REQUEST)
                }
            }

        } catch (error) {
            console.error('internal server error', error)
            return httpResponse.errorResponse(res, `Internal server error`, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async createWalletPin(req, res) {
        try {
            let { pin, email } = req.body
            //check if all data is passed
            if (!email || !pin) {
                return httpResponse.errorResponse(res, 'all field (email, pin) is required', StatusCodes.BAD_REQUEST)
            }
            if (pin.length !== 4) return httpResponse.errorResponse(res, 'the pin length should be 4', StatusCodes.BAD_REQUEST)
            // pin = Number(pin)
            const userExist = await indexService.getUser(email.toLowerCase())
            if (!userExist) return httpResponse.errorResponse(res, 'user does not exist', StatusCodes.BAD_REQUEST)
            else if (userExist.isDeleted === true) {
                return httpResponse.errorResponse(res, 'user is inactive please contact admin to activate user', StatusCodes.NO_CONTENT)
            } else if (userExist) {
                const salt = await bcrypt.genSalt(10)
                const userHashedPin = await bcrypt.hash(pin, salt)
                const payload = {
                    walletId: userExist.id,
                    pin: userHashedPin,
                    // email: email.toLowerCase()
                }
                let createUserPin = await indexService.createPin(payload)
                if (createUserPin) {
                    // updates hasPin field on wallet to true
                    await indexService.updateHasPin(createUserPin.walletId)
                    return httpResponse.successResponse(res, { createUserPin }, 'Pin created successfully', StatusCodes.CREATED)
                }
            }
        } catch (error) {
            console.error('internal server error', error)
            return httpResponse.errorResponse(res, `Internal server error`, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }


}

module.exports = new WalletController()