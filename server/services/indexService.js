const User = require('../models').User;
const Beneficiary = require('../models').Beneficiary;
const Profile = require('../models/profile').Profile;
const Wallet = require('../models').Wallet;
const Walletpin = require('../models').Walletpin;
const Transactionlog = require('../models').Transactionlog;

console.log('User >>>>>', User)
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


}

module.exports = new indexService()