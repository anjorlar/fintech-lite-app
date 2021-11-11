const axios = require('axios')
const settings = require('../config/settings')

const createPaystackCustomer = async (user) => {
    try {
        const createCustomerData = {
            email: user.email,
            first_name: user.name.split(' ')[0],
            last_name: user.name.split(' ')[1] || '',
            phone: `${user.mobile} || ''`,
        }
        const customer = await axios.post(settings.payStack.CUSTOMER, createCustomerData, {
            headers: { Authorization: `Bearer ${settings.payStack.TOKEN}` },
        })
        return {
            status: customer.data.status,
            data: customer.data.data
        }
    } catch (error) {
        console.error(error.response.data);
        return {
            data: error.response.data,
            message: error.response.data.message,
            status: error.response.data.status,
        };
    }
}


const processCreditPayment = async (user, amount, fundType, paymentDetails) => {
    try {
        const val = await createPaystackCustomer(user);
        switch (fundType) {
            case "card": {
                const fundObj = {
                    email: user.email,
                    amount: amount.toString(),
                    card: {
                        cvv: paymentDetails.cvv.toString(),
                        number: paymentDetails.cardNumber.toString(),
                        expiry_month: paymentDetails.expiryMonth.toString(),
                        expiry_year: paymentDetails.expiryYear.toString(),
                    }
                }
                const fund = await axios.post(settings.payStack.CHARGE, fundObj, {
                    headers: { Authorization: `Bearer ${settings.payStack.TOKEN}` }
                })
                return {
                    status: fund.data.status,
                    data: fund.data.data
                }
            };
            case "bank": {
                const fundObj = {
                    email: user.email,
                    amount: amount.toString(),
                    card: {
                        cvv: paymentDetails.cvv.toString(),
                        number: paymentDetails.cardNumber.toString(),
                        expiry_month: paymentDetails.expiryMonth.toString(),
                        expiry_year: paymentDetails.expiryYear.toString(),
                    }
                }
                const fund = await axios.post(settings.payStack.CHARGE, fundObj, {
                    headers: { Authorization: `Bearer ${settings.payStack.TOKEN}` }
                })
                return {
                    status: fund.data.status,
                    data: fund.data.data
                }
            };
            default: {
                return {
                    data: `transaction type is not sent`,
                    status: null
                }
            }
        }
    } catch (error) {

    }
}

const getTransactionLogs = (payStackData, user, wallet, type, amount) => {
    const transactionPayload = {
        availableBalance: wallet.availableBalance,
        meta: {
            ref: payStackData.data.reference,
            comment: payStackData.data.display_text,
            ref: `paystack`,
        },
        userId: user.id,
        channel: type.toUpperCase(),
        userType: type.userType,
        domain: 'EXTERNAL',
        amount,
    };
    return {
        message: 'transaction is in progress...',
        data: transactionPayload
    }
}

module.exports = {
    getTransactionLogs, createPaystackCustomer, processCreditPayment
}