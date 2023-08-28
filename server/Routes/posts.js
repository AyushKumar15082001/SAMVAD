const express = require('express');
const postRouter = express.Router();

const { getPosts, createPost, updatePost, deletePost } = require('../Controllers/posts');

postRouter
.get('/', getPosts)
.post('/', createPost)
.patch('/', updatePost)
.delete('/:id', deletePost)

module.exports = {postRouter};