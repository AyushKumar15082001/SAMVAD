const jwt = require('jsonwebtoken');
// const { User } = require('../Models/users');

exports.auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body = {...req.body, ...decodedToken};
        next();
    } catch(err) {
        // console.log('auth middleware error', err);
        res.status(401).send({error: 'Please authenticate'});
    }
}
