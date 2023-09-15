const express = require('express');
const actionRouter = express.Router();

const { postLike } = require('../Controllers/actions');

actionRouter.post('/like', postLike);

module.exports = {actionRouter};