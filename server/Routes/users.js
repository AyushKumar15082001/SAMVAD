const express = require('express');
const userRouter = express.Router();

const { getUser, updateUser, deleteUser } = require('../Controllers/users');

userRouter
.get('/', getUser)
// .post('/', createUser)
.patch('/', updateUser)
.delete('/', deleteUser)

module.exports = {userRouter};