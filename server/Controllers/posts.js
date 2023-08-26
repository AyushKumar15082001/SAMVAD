const axios = require('axios');
const {Post} = require('../Models/posts');

const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.send(posts)   
}
const createPost = async (req, res) => {
    try{
        const post = new Post(req.body);
        await post.save();
        res.send(post)
    } catch (err) {
        res.status(400).send(err)
    }
}

const updatePost = async(req, res) => {
    const { id } = req.params;
    const post = await Post.findOneAndUpdate({_id:id}, {text:req.body.text}, {new:true});
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