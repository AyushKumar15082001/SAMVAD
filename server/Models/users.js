//user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, minLength:6, required: true},
    profilePic: String,
    bannerPic: String,
    date: { type: Date, default: Date.now },
    token: String,

    // followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // retweetedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // likedComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // retweetedComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // likedReplies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
    // retweetedReplies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
});
const User = mongoose.model('User', userSchema);
module.exports = {User};