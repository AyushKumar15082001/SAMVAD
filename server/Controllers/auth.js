const {User} = require('../Models/users');
exports.signup = async(req, res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        res.send(user);
        console.log(user);
    } catch (err) {
        res.status(401).send(err);
    }
}