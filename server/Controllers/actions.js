const { Like, Comment } = require('../Models/actions');
const mongoose = require('mongoose');
const postLike = (req, res) => {
    Like.findOneAndDelete( { user_id: req.body.user_id, post_id: req.body.post_id } ).then((like) => {
        if (like) {
            res.send("unliked your post");
        } else {
            const like = new Like({ user_id: req.body.user_id, post_id: req.body.post_id });
            like.save().then(() => {
                res.send("liked your post");
            })
        }
    })
}

const getComments = async(req, res)=>{
    // Comment.find({post_id: req.body.post_id}).then(async(doc) =>await doc.aggregate([
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'user_id',
    //             foreignField: '_id',
    //             as: 'user'
    //         },
           
    //     },
    // ]))
    // .then(doc => res.send(doc));
    const comments = await Comment.aggregate([
        {
            $match: {post_id: new mongoose.Types.ObjectId(req.body.post_id)}
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
}

const postComment = (req, res) => {
    const comment = new Comment({ user_id: req.body.user_id, post_id: req.body.post_id, comment: req.body.comment });
    comment.save().then(() => {
        res.send("commented on your post");
    }).catch(err =>{
        res.send(err)
        console.log(err)
    })
}

module.exports = {
    postLike,
    getComments,
    postComment
};