const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post'},
    date: { type: Date, default: Date.now },
});

const Like = mongoose.model('Like', likeSchema);
module.exports = {Like};