const express = require('express');
const path = require('path');
const actionRouter = express.Router();

const { postLike, getPostLikes, getComments, postComment, updateComment, deleteComment } = require(path.join(__dirname, '..', 'Controllers', 'actions'));

actionRouter
.get('/like/:id', getPostLikes)
.post('/like', postLike)
.get('/comment/:id', getComments)
.post('/comment', postComment)
.patch('/comment', updateComment)
.delete('/comment/:id', deleteComment)

module.exports = {actionRouter};