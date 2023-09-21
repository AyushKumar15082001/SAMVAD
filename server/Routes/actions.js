const express = require('express');
const actionRouter = express.Router();

const { postLike, getPostLikes, getComments, postComment, updateComment, deleteComment } = require('../Controllers/actions');

actionRouter
.get('/like/:id', getPostLikes)
.post('/like', postLike)
.get('/comment/:id', getComments)
.post('/comment', postComment)
.patch('/comment', updateComment)
.delete('/comment/:id', deleteComment)

module.exports = {actionRouter};