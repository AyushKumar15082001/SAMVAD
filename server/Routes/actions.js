const express = require('express');
const actionRouter = express.Router();

const { postLike, postComment } = require('../Controllers/actions');

actionRouter
.post('/like', postLike)
.post('/comment', postComment)

module.exports = {actionRouter};