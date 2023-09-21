const express = require('express');
const path = require('path');
const authRouter = express.Router();
// const { signup, login } = require('../Controllers/auth');
// const { signauth } = require('../Middlewares/signauth');
const { signup, login } = require(path.resolve(__dirname, '..', 'Controllers', 'auth'));
const { signauth } = require(path.resolve(__dirname, '..', 'Middlewares', 'signauth'));

authRouter
.post('/signup',signauth, signup)
.post('/login', login);

module.exports = { authRouter };