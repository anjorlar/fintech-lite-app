const User = require('../models').User;
const Beneficiary = require('../models').Beneficiary;
const Profile = require('../models/profile').Profile;
const Wallet = require('../models').Wallet;
const Walletpin = require('../models').WalletPin;
const Transactionlog = require('../models').TransactionLog;

console.log('User >> User User>>>', User)
console.log('Walletpin > Walletpin Walletpin>>>', Walletpin)
// console.log('User >>>>>', User)
class indexService {

    //get user that has the fields that was passed in
    getUser(email) {
        console.log('>>>> email', email)
        return User.findOne({ where: { email: email } });
    }

    createUser(obj) {
        return User.create(obj)
    }

    createUserWallet(id) {
        return Wallet.create({ userId: id })
    }

    createPin(obj) {
        return Walletpin.create(obj)
    }

    updateHasPin(id) {
        return Wallet.update({ hasPin: true }, {
            where: {
                id
            }
        })
    }

    getUsersWallet(userId) {
        return Wallet.findOne({
            where: { userId }
        })
    }

    createTransactionLog(obj) {
        return Transactionlog.create(obj)
    }

    fundWallet(obj) {
        return Wallet.update({ availableBalance: obj.availableBalance }, {
            where: {
                id: obj.id
            }
        })
    }
}

module.exports = new indexService()