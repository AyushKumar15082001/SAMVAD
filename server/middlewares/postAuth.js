const jwt = require('jsonwebtoken');
// const { User } = require('../Models/users');

exports.postAuth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('decodedToken', decodedToken);
        req.body = {...req.body, ...decodedToken};
        // console.log('token', req.body);
        next();
    } catch(err) {
        // console.log('auth middleware error', err);
        res.status(401).send({error: 'Please authenticate'});
    }
}
