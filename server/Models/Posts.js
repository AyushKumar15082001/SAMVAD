//posts schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: String,
    userName: {type: String, required: true},
    text: {type: String, required: true},
    image: String,
    date: { type: Date, default: Date.now },
    likes: {type: Number, default: 0},
    retweets: {type: Number, default: 0},
    comments: {type: Number, default: 0},
});
const Post = mongoose.model('Post', postSchema);
module.exports = {Post};