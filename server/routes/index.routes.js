const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router()

router.post('/signup', indexController.userSignUp);

module.exports = router