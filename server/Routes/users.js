const express = require('express');
const path = require('path');
const userRouter = express.Router();

// const { getUser, updateUser, deleteUser } = require('../Controllers/users');
const { getUser, updateUser, deleteUser } = require(path.join(__dirname, '..', 'Controllers', 'users'));

userRouter
.get('/', getUser)
// .post('/', createUser)
.patch('/', updateUser)
.delete('/', deleteUser)

module.exports = {userRouter};