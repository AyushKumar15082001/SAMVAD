const jwt = require('jsonwebtoken');
const { User } = require('../Models/users');

exports.auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        next();
        // console.log("auth middleware", token);
    } catch(err) {
        console.log('auth middleware error', err);
        res.status(401).send({error: 'Please authenticate'});
    }
}
