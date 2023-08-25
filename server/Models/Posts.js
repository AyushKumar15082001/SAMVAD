//posts schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: String,
    body: String,
});
const Post = mongoose.model('Post', postSchema);
// const post = new Post({
//     title: "Hello",
//     body: "World"
// })
// post.save()
// module.exports = Post
module.exports = {Post};