const express = require('express');
const router = express.Router();
const {RegisterUser, UserLogin} = require('../controller/authController');

router.post('/register', RegisterUser);

router.post('/login', UserLogin);

module.exports = router;