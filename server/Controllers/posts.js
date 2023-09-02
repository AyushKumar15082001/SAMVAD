const axios = require('axios');
const { Post } = require('../Models/posts');
// const {User} = require('../Models/users');

const getPosts = async (req, res) => {
    // const posts = await Post.find().sort({date:-1}).lean().exec();
    // res.send(posts)
    //aggreage posts with user info
    const posts = await Post.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                'user._id': 0,
                'user.email': 0,
                'user.password': 0,
                'user.bannerPic': 0,
                'user.bio': 0,
                'user.followers': 0,
                'user.following': 0,
                'user.date': 0,
                'user.__v': 0,
                // 'user.username': 0,
                // 'user.profilePic': 0,
            }
        },
        {
            $sort: { date: -1 }
        }
    ]);
    const finalPosts = posts.map(post => {
        const {user, user_id, ...rest} = post;
        return {...rest, ...user};
    })
    res.send(finalPosts);
}

const createPost = async (req, res) => {
    try {
        // const post = new Post({ text: req.body.text, name: req.body.name, username: req.body.username, profilePic: req.body.profilePic });
        const post = new Post({ text: req.body.text, user_id: req.body.user_id });
        await post.save();
        const { user_id, ...rest } = post._doc;
        res.send(rest)
    } catch (err) {
        res.status(400).send(err)
    }
}

const updatePost = (req, res) => {
    //send the id and text as body
    const { id, text } = req.body;
    Post.findOne({ _id: id }).then(doc => {
        if (doc.user_id.toHexString() !== req.body.user_id) {
            res.status(401).send('Unauthorized');
        }
        else {
            doc.text = text;
            doc.date = Date.now();
            doc.save();
            const { user_id, ...rest } = doc._doc;
            res.send(rest);
        }
    }).catch(err => {
        res.status(404).send('Post not found');
    })
};

const deletePost = (req, res) => {
    const { id } = req.params;
    Post.findOneAndDelete({ _id: id, user_id: req.body.user_id }).then(doc => {
        if (doc) {
            res.send({ message: 'Post deleted successfully.' });
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
    ).catch(err => {
        res.status(400).send('Post not found');
    })
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
};