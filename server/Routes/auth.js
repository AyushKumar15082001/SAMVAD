const express = require('express');
const authRouter = express.Router();
const { signup, login } = require('../Controllers/auth');

authRouter
.post('/signup', signup)
.post('/login', login);

module.exports = { authRouter };