const path = require("path");

// const { User } = require('../Models/users');
const { User } = require(path.resolve(__dirname, '..', 'Models', 'users'));
exports.signauth = (req, res, next) => {
    //validate password with regex
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/
    const isPasswordValid = passwordRegex.test(req.body.password);
    if (!isPasswordValid) {
        return res.status(401).send({ message: 'Weak Password.' });
    }

    //check if user name already exists
    User.findOne({ username: req.body.username }).then(doc => {
        if (doc) {
            return res.status(401).send({ message: 'Username already taken.' });
        }
        else {
            //check if email already exists
            User.findOne({ email: req.body.email }).then(doc => {
                if (doc) {
                    return res.status(401).send({ message: 'Email already exists. Try logging in' });
                }
                else next();
            }
            ).catch(err => {
                res.status(401).send(err);
            });
        }
    }).catch(err => {
        res.status(401).send(err);
    });
}