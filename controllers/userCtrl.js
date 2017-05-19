const User = require('../models/userModel');
const { MonthlyBudget } = require('../models/budgetModel')
const jwt = require('jwt-simple');
const { config } = require('../config');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

module.exports.signIn = (req, res, next) => {
      res.send({ token: tokenForUser(req.user), userId : req.user._id })
}

module.exports.signUp = ({body: { email, password }}, res, next) => {
    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide an email and a password'});
    }

    User.findOne({ email }, (err, existingUser) => {
        if (err) { return next(err); }

        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        const user = new User({
            email: email,
            password: password
        });

        user.save(err => {
            if (err) { return next(err); }

            res.json({ token: tokenForUser(user), userId : user._id });
        });
    });
}
