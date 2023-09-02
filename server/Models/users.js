//user schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, required: [true, "Please provide name"], validate:
        {
            validator: function (value) {
                return /^[a-zA-Z ]{3,20}$/.test(value);
            }, message: props => `${props.value} is not a valid name!`
        }
    },
    username: {
        type: String, required: [true, "Please provide username"], unique: true, validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9_-]{3,15}$/.test(value);
            }, message: props => `${props.value} is not a valid username!`
        }
    },
    email: {
        type: String, required: [true, "Please provide your email"], unique: true, validate: {
            validator: function (value) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            }, message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: [true, "Please provide password"] },
    profilePic: {type: String, default: "https://res.cloudinary.com/dvrdekci0/image/upload/q_auto,f_auto/v1693592592/my-profile/lucvpgh0uhcmuwenxd1u.png",},
    bannerPic: {type: String, default: "https://res.cloudinary.com/dvrdekci0/image/upload/q_auto,f_auto/v1693593046/my-profile/hpezdx2k3fc1pzc3pjj0.jpg", },
    profilePicPublicId: String,
    bannerPicPublicId: String,
    bio: { type: String, maxlength: 160, default: "This is my bio" },
    date: { type: Date, default: Date.now },
    // token: String,

    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // retweetedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // likedComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // retweetedComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    // likedReplies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
    // retweetedReplies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
});
const User = mongoose.model('User', userSchema);
module.exports = { User };