const express = require('express');
const path = require('path');
const postRouter = express.Router();

const { getPosts, createPost, updatePost, deletePost } = require(path.join(__dirname, '..', 'Controllers', 'posts'));

postRouter
.get('/', getPosts)
.post('/', createPost)
.patch('/', updatePost)
.delete('/:id', deletePost)

module.exports = {postRouter};