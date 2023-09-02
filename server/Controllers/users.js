const axios = require('axios');
const { User } = require('../Models/users');
const { uploadToCloudinary } = require('../services/cloudinary')

const getUser = async (req, res) => {

    try {
        const users = await User.findOne({ email: req.body.email }).lean().exec();
        const { password, _id, ...rest } = users;
        res.send(rest)
    } catch (err) {
        res.status(400).send(err)
    }
}
// const createUser = async (req, res) => {
//     const user = new User(req.body);
//     try{
//         await user.save();
//         res.send(user)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// }
const updateUser = async (req, res) => {
    // //finding the user and updating the user
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            //check if username already exists
            User.findOne({ username: req.body.username }).then((user) => {
                if (user) {
                    throw new Error("Username already exists")
                }
            }).then(async () => {
                if (req.body.name) user.name = req.body.name;
                if (req.body.bio) user.bio = req.body.bio;
                if (req.body.username) user.username = req.body.username;
                if (req.body.profilePic) {
                    const results = await uploadToCloudinary(req.body.profilePic, "my-profile")
                    user.profilePic = results.url.replace("upload/", "upload/q_auto,f_auto/")
                }
                if (req.body.bannerPic) {
                    const results = await uploadToCloudinary(req.body.bannerPic, "my-profile")
                    user.bannerPic = results.url.replace("upload/", "upload/q_auto,f_auto/")
                }
                await user.save();
                res.send(user);
            }).catch(err => {
                res.status(400).send(err.message)
            })
        }
        else {
            throw new Error("User not found")
        }
    }).catch(err => {
        res.status(400).send(err.message)
    })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
}
module.exports = {
    getUser,
    // createUser,
    updateUser,
    deleteUser
};