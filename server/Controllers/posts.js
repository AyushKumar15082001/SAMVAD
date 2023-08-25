const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const model = require('../Models/Posts');
const Post = model.Post;
dotenv.config();

const db = mongoose.connect(`mongodb+srv://kumarayush15aug01:${process.env.MONGO_PASSWORD}@cluster0.qehipvm.mongodb.net/twitter`, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Database connected")
}).catch((err)=>{console.log(err)})

const getPosts = async (req, res) => {
    const posts = await Post.find()
    res.send(posts)   
}
const createPost = async (req, res) => {
    const post = new Post(req.body);
    post.save();
    res.send(post)
}

const updatePost = async(req, res) => {
    const { id } = req.params;
    const post = await Post.findOneAndUpdate({_id:id}, req.body);
    // console.log(req.body)
    res.send(post);
};

const deletePost = async(req, res) => {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({_id:id});
    res.send(post);
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
};