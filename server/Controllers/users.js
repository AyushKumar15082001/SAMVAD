const axios = require('axios');
const { User } = require('../Models/users');
const { Post } = require('../Models/posts')
const { uploadToCloudinary, deleteFromCloudinary } = require('../services/cloudinary')

const getUser = async (req, res) => {
    try {
        const users = await User.findOne({ email: req.body.email }).lean().exec();
        const { password, _id, ...rest } = users;
        res.send(rest)
    } catch (err) {
        res.status(400).send(err)
    }
}

const updateUser = async (req, res) => {
    // //finding the user and updating the user
    User.findOne({ email: req.body.email }).then(async (user) => {
        if (user) {

            if (req.body.name) user.name = req.body.name;
            if (req.body.bio) user.bio = req.body.bio;
            if (req.body.profilePic) {
                if(user.profilePicPublicId) await deleteFromCloudinary(user.profilePicPublicId)
                const results = await uploadToCloudinary(req.body.profilePic, "my-profile")
                user.profilePic = results.url.replace("upload/", "upload/q_auto,f_auto/")
                user.profilePicPublicId = results.publicId;
            }
            if (req.body.bannerPic) {
                const results = await uploadToCloudinary(req.body.bannerPic, "my-profile")
                user.bannerPic = results.url.replace("upload/", "upload/q_auto,f_auto/")
                if(user.bannerPicPublicId) await deleteFromCloudinary(user.bannerPicPublicId)
                user.bannerPicPublicId = results.publicId;
            }
            if (req.body.username) {
                const doc = await User.findOne({ username: req.body.username }).lean().exec();
                if (doc) throw new Error("Username already exists")
                else user.username = req.body.username;
            }

            await user.save();
            const { password, _id, ...rest } = user._doc;
            res.send(rest);
        }
        else {
            throw new Error("User not found")
        }
    }).catch(err => {
        res.status(400).send(err.message)
    })
}

const deleteUser = async (req, res) => {
    const user = await User.findOneAndDelete({ email: req.body.email });
    if (user) {
        await Post.deleteMany({ user_id: user._id })
        if(user.profilePicPublicId) await deleteFromCloudinary(user.profilePicPublicId)
        if(user.bannerPicPublicId) await deleteFromCloudinary(user.bannerPicPublicId)
        res.send({ message: "User deleted" })
    }
    else res.status(400).send("User not found")
}

module.exports = {
    getUser,
    updateUser,
    deleteUser
};