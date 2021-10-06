const User = require('../models').User;
const Beneficiary = require('../models/beneficiary');
const Profile = require('../models/profile');
const Wallet = require('../models/wallet');
const Walletpin = require('../models/walletpin');
const Transactionlog = require('../models/transactionlog');

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

    createUserWallet() {
        return Wallet.create()
    }


}

module.exports = new indexService()