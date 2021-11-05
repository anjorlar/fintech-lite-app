const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router()

router.post('/signup', indexController.userSignUp);
router.post('/login', indexController.login);

module.exports = router