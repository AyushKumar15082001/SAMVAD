const { Like, Comment } = require('../Models/actions');
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

const postComment = (req, res) => {
    const comment = new Comment({ user_id: req.body.user_id, post_id: req.body.post_id, comment: req.body.comment });
    comment.save().then(() => {
        res.send("commented on your post");
    })
}

module.exports = {
    postLike,
    postComment
};