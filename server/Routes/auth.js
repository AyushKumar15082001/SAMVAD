const express = require('express');
const authRouter = express.Router();
const { signup } = require('../Controllers/auth');

authRouter
.post('/signup', signup);

module.exports = { authRouter };