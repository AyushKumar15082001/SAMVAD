const { Like } = require('../Models/actions');
const postLike = (req, res) => {
    // const like = new Like({ user_id: req.body.user_id, post_id: req.body.post_id });
    // Like.findOne()

    // find if user already liked the post
    // if yes, unlike the post
    // if no, like the post
    // Like.findOne({ user_id: req.body.user_id, post_id: req.body.post_id }).then((like) => {
    //     if (like) {
    //         like.remove().then(() => {
    //             res.send("unliked your post");
    //         })
    //     } else {
    //         const like = new Like({ user_id: req.body.user_id, post_id: req.body.post_id });
    //         like.save().then(() => {
    //             res.send("liked your post");
    //         })
    //     }
    // })
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

module.exports = {
    postLike
};