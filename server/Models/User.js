//user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: String,
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    profilePic: String,
    bannerPic: String,
    date: { type: Date, default: Date.now },

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
