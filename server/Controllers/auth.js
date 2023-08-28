const { User } = require('../Models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    try {
        const user = new User(req.body);
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            user.password = hash;
            user.save();
        });
        res.send(user);
        // console.log(user);
    } catch (err) {
        res.status(401).send(err);
    }
}
exports.login = (req, res) => {
    User.findOne({ email: req.body.email }).then(doc => {
        const isAuth = bcrypt.compareSync(req.body.password, doc.password);
        if (isAuth) {
            // console.log(req.body)
            var token = jwt.sign({ email: doc.email, username: doc.username, name: doc.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const userData = { username: doc.username, name: doc.name };
            res.send({token, userData});
        }
        else {
            res.status(401).send('Wrong Username or Password');
        }
    }).catch(err => {
        res.status(401).send('Wrong Username or Password');
        console.log(err);
    })
}