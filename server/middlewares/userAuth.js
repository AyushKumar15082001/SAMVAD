const jwt = require('jsonwebtoken');

exports.userAuth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const {name, username, profilePic, bannerPic, bio} = req.body;
        req.body = {name, username, profilePic, bannerPic, bio, email:decodedToken.email};
        // console.log('token', req.body);
        // console.log(decodedToken)
        next();
    } catch(err) {
        // console.log('auth middleware error', err);
        res.status(401).send({error: 'Please authenticate'});
    }
}
