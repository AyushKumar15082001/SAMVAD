const { Like, Comment } = require('../Models/actions');
const mongoose = require('mongoose');
const postLike = (req, res) => {
    Like.findOneAndDelete({ user_id: req.body.user_id, post_id: req.body.post_id }).then((like) => {
        if (like) {
            res.send("unliked your post");
        } else {
            const like = new Like({ user_id: req.body.user_id, post_id: req.body.post_id });
            like.save().then(() => {
                res.send("liked your post");
            })
        }
    }).catch(err => {
        res.send(err);
        console.log(err)
    })
}
const getPostLikes = async (req, res) => {
    try {
        const likes = await Like.aggregate([
            {
                $match: { post_id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
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
                $sort: { date: -1 }
            }
        ]);
        const finalLikes = likes.map((like) => {
            const { user, user_id, ...rest } = like;
            return { ...rest, ...user };
        }
        )
        res.send(finalLikes);
    } catch (err) {
        res.send(err);
        console.log(err)
    }
}

const getComments = async (req, res) => {
    try {
        const comments = await Comment.aggregate([
            {
                $match: { post_id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
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
                $sort: { date: -1 }
            }
        ]);
        const finalComments = comments.map((comment) => {
            const { user, user_id, ...rest } = comment;
            return { ...rest, ...user };
        })
        res.send(finalComments);
    } catch (err) {
        res.send(err);
        console.log(err)
    }
}

const postComment = (req, res) => {
    if (!req.body.comment) return res.status(400).send('Comment is required');
    const comment = new Comment({ user_id: req.body.user_id, post_id: req.body.post_id, comment: req.body.comment });
    comment.save().then((doc) => {
        const { user_id, ...rest } = doc._doc;
        res.send(rest);
    }).catch(err => {
        res.send(err)
        console.log(err)
    })
}

const updateComment = (req, res) => {
    if (!req.body.comment) return res.status(400).send('Comment is required');
    Comment.findOne({ user_id: req.body.user_id, _id: req.body.comment_id }).then((comment) => {
        if (comment) {
            comment.comment = req.body.comment;
            comment.edited = true;
            comment.date = Date.now();
            comment.save().then((doc) => {
                const { user_id, ...rest } = doc._doc;
                res.send(rest);
            })
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }).catch(err => {
        res.send(err);
        console.log(err)
    })
}

const deleteComment = (req, res) => {
    Comment.findOneAndDelete({ user_id: req.body.user_id, _id: req.params.id }).then((comment) => {
        if (comment) {
            res.send({ message: 'comment deleted successfully.' });
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }).catch(err => {
        res.send(err);
        console.log(err)
    })


    // Comment.findByIdAndDelete(req.params.id).then((comment) => {
    //     res.send(comment);
    // }).catch(err => {
    //     res.send(err);
    //     console.log(err)
    // })
}

module.exports = {
    postLike,
    getPostLikes,
    getComments,
    postComment,
    updateComment,
    deleteComment
};