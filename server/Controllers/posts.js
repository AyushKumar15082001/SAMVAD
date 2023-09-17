const { Post } = require('../Models/posts');
const mongoose = require('mongoose');
const { uploadToCloudinary, deleteFromCloudinary } = require('../services/cloudinary')

const getPosts = async (req, res) => {
    const posts = await Post.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
            },
           
        },
        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'post_id',
                as: 'likes'
            },
        },
        {
            $unwind: '$user',
        },
        {
            $project: {
                'user._id': 0,
                'user.email': 0,
                'user.password': 0,
                'user.bannerPic': 0,
                'user.profilePicPublicId': 0,
                'user.bannerPicPublicId': 0,
                'user.bio': 0,
                'user.followers': 0,
                'user.following': 0,
                'user.date': 0,
                'user.__v': 0,
            }
        },
        {
            $addFields: {
                likeCount: { $size: '$likes' },
                userLiked: { $in: [new mongoose.Types.ObjectId(req.body.user_id), '$likes.user_id'] },
            },
        },
        {
            $sort: { date: -1 }
        }
    ]);
    const finalPosts = posts.map((post) => {
        const { user, user_id, ...rest } = post;
        return { ...rest, ...user };
    })
    res.send(finalPosts);
}

const createPost = async (req, res) => {
    try {
        if (req.body.image) {
            const results = await uploadToCloudinary(req.body.image, "my-images")
            req.body.image = results.url.replace("upload/", "upload/q_auto,f_auto/")
            req.body.PublicId = results.publicId;
        }
        const post = new Post({ text: req.body.text, image: req.body.image, mediaPublicId: req.body.PublicId, user_id: req.body.user_id });
        await post.save();
        const { user_id, ...rest } = post._doc;
        res.send({...rest, likeCount:0, userLiked:false})
    } catch (err) {
        res.status(400).send(err)
    }
}

const updatePost = (req, res) => {
    const { id, text } = req.body;
    Post.findOne({ _id: id }).then(async (doc) => {
        if (doc.user_id.toHexString() !== req.body.user_id) {
            res.status(401).send('Unauthorized');
        }
        else {
            if (!text) return res.status(400).send('Text is required');
            doc.text = text;
            doc.date = Date.now();
            // update image
            if (req.body.image) {
                if (doc.mediaPublicId) await deleteFromCloudinary(doc.mediaPublicId)
                const results = await uploadToCloudinary(req.body.image, "my-profile")
                doc.image = results.url.replace("upload/", "upload/q_auto,f_auto/")
                doc.mediaPublicId = results.publicId;
            }
            doc.edited = true;

            await doc.save();
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
            if (doc.mediaPublicId) deleteFromCloudinary(doc.mediaPublicId);
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