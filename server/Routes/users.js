const express = require('express');
const path = require('path');
const userRouter = express.Router();

// const { getUser, updateUser, deleteUser } = require('../Controllers/users');
const { getUser, getUserByUsername, updateUser, deleteUser } = require(path.resolve(__dirname, '..', 'Controllers', 'users'));

userRouter
.get('/', getUser)
.get('/:username', getUserByUsername)
// .post('/', createUser)
.patch('/', updateUser)
.delete('/', deleteUser)

module.exports = {userRouter};