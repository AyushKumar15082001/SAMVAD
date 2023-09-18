const express = require('express');
const actionRouter = express.Router();

const { postLike, getComments, postComment, updateComment, deleteComment } = require('../Controllers/actions');

actionRouter
.post('/like', postLike)
.get('/comment/:id', getComments)
.post('/comment', postComment)
.patch('/comment', updateComment)
.delete('/comment/:id', deleteComment)

module.exports = {actionRouter};