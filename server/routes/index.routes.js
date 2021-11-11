const { Router } = require('express');
const indexController = require('../controllers/indexController');
const walletController = require('../controllers/walletController');
const auth = require('../middlewares/auth')
const router = Router()

router.post('/signup', indexController.userSignUp);
router.post('/login', indexController.login);
router.post('/createPin', auth, walletController.createWalletPin);
router.post('/fundWallet', auth, walletController.fundWallet);

module.exports = router