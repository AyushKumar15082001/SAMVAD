const path = require('path')
const { Post } = require(path.join(__dirname, '..', 'Models', 'posts'));
const { Like, Comment } = require(path.join(__dirname, '..', 'Models', 'actions'));
const mongoose = require('mongoose');
const { uploadToCloudinary, deleteFromCloudinary } = require(path.join(__dirname, '..', 'services', 'cloudinary'));
const { User } = require(path.join(__dirname, '..', 'Models', 'users'));

const getPosts = async (req, res) => {
    try {
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
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'comments'
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
                    // 'likes.likes': 0,
                }
            },
            {
                $addFields: {
                    likeCount: { $size: '$likes' },
                    userLiked: { $in: [new mongoose.Types.ObjectId(req.body.user_id), '$likes.user_id'] },
                    commentCount: { $size: '$comments' },
                },
            },
            {
                $project: {
                    'likes.post_id': 0,
                    'likes.user_id': 0,
                    'likes.__v': 0,
                    'likes.date': 0,
                    'likes._id': 0,
                    'comments.post_id': 0,
                    'comments.user_id': 0,
                    'comments.__v': 0,
                    'comments.date': 0,
                    'comments.edited': 0,
                    'comments.comment': 0,
                    'comments._id': 0,
                }
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
    } catch (err) {
        res.send(err);
    }
}

const createPost = async (req, res) => {
    User.findById(req.body.user_id).then(async (user) => {
        if (!req.body.text) return res.status(400).send('Text is required');
        if (user) {
            if (req.body.image) {
                const results = await uploadToCloudinary(req.body.image, "my-images")
                req.body.image = results.url.replace("upload/", "upload/q_auto,f_auto/")
                req.body.PublicId = results.publicId;
            }
            const post = new Post({ text: req.body.text, image: req.body.image, mediaPublicId: req.body.PublicId, user_id: req.body.user_id });
            await post.save();
            const { user_id, ...rest } = post._doc;
            res.send({ ...rest, likeCount: 0, userLiked: false, commentCount: 0 })
        }
        else {
            return res.status(401).send('User not found');
        }
    }).catch(err => {
        res.status(400).send('User not found');
    })
}

const updatePost = (req, res) => {
    const { id, text } = req.body;
    Post.findOne({ _id: id, user_id: req.body.user_id }).then(async (doc) => {
        // if (doc.user_id.toHexString() !== req.body.user_id) {
        //     res.status(401).send('Unauthorized');
        // }
        // else {
        if (doc) {
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
        else {
            res.status(401).send('Unauthorized');
        }
    }).catch(err => {
        res.status(404).send('Post not found');
    })
};

const deletePost = (req, res) => {
    const { id } = req.params;
    Post.findOneAndDelete({ _id: id, user_id: req.body.user_id }).then(async (doc) => {
        if (doc) {
            if (doc.mediaPublicId) deleteFromCloudinary(doc.mediaPublicId);
            await Like.deleteMany({ post_id: id });
            await Comment.deleteMany({ post_id: id });
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