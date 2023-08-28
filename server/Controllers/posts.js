const axios = require('axios');
const { Post } = require('../Models/posts');
// const {User} = require('../Models/users');

const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.send(posts)
}

const createPost = async (req, res) => {
    try {
        const post = new Post({ text: req.body.text, name: req.body.name, username: req.body.username });
        await post.save();
        res.send(post)
    } catch (err) {
        res.status(400).send(err)
    }
}

const updatePost = (req, res) => {
    //send the id and text as body
    const { id, text } = req.body;
    Post.findOne({ _id: id }).then(doc => {
        if (doc.username !== req.body.username) {
            res.status(401).send('Unauthorized');
        }
        else {
            doc.text = text;
            doc.date = Date.now();
            doc.save();
            res.send(doc);
        }
    }).catch(err => {
        res.status(404).send('Post not found');
    })
};

const deletePost = (req, res) => {
    //just send the id as params
    const { id } = req.params;
    Post.findOneAndDelete({ _id: id, username: req.body.username }).then(doc => {
        if (doc) {
            res.send(doc);
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
    ).catch(err => {
        res.status(404).send('Post not found');
    })
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
};