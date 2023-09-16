const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post'},
    date: { type: Date, default: Date.now },
});

const commentSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post'},
    comment: String,
    date: { type: Date, default: Date.now },
});

const Like = mongoose.model('Like', likeSchema);
const Comment = mongoose.model('Comment', commentSchema);
module.exports = {Like, Comment};