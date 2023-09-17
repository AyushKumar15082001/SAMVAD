const express = require('express');
const actionRouter = express.Router();

const { postLike, getComments, postComment } = require('../Controllers/actions');

actionRouter
.post('/like', postLike)
.get('/comment', getComments)
.post('/comment', postComment)

module.exports = {actionRouter};