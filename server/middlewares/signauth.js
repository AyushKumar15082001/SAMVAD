exports.signauth = (req, res, next) => {
    console.log('signauth middleware');
    //validate password with regex
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/
    const isPasswordValid = passwordRegex.test(req.body.password);
    if (!isPasswordValid) {
        // return res.status(401).send('Weak Password.');
        //send error as json
        return res.status(401).send({ message: 'Weak Password.' });

    }
    next();
}