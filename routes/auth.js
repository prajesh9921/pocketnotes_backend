const express = require('express');
const router = express.Router();
const {RegisterUser} = require('../controller/authController');

router.post('/register', RegisterUser);

module.exports = router;