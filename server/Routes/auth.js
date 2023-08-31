const express = require('express');
const authRouter = express.Router();
const { signup, login } = require('../Controllers/auth');
const { signauth } = require('../Middlewares/signauth');

authRouter
.post('/signup',signauth, signup)
.post('/login', login);

module.exports = { authRouter };