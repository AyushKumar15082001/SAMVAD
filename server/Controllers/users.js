const axios = require('axios');
const {User} = require('../Models/users');

const getUser = async (req, res) => {
    const users = await User.find();
    res.send(users)   
}
const createUser = async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.send(user)
    } catch (err) {
        res.status(400).send(err)
    }
}
const updateUser = async(req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndUpdate({_id:id}, req.body, {new:true});
    res.send(user);
}
const deleteUser = async(req, res) => {
    const { id } = req.params;
    const user = await User.findOneAndDelete({_id:id});
    res.send(user);
}
module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};