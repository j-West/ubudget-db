'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/userModel');
// const { config } = require('../config');

const localOptions = { usernameField: "email"}

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({ email }, (error, user) => {
        if (error) { return done(error) }
        if(!user) { return done(null, false) }

        user.comparePassword(password, (error, isMatch) => {
            if (error) { return done(error) }
            if (!isMatch) { return done(null, false) }

            return done(null, user)
        })
    })
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: "sdfgsdfgksjhdfkgj"
    // secretOrKey: config.secret
};


const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

    User.findById(payload.sub, (err, user) => {
        if (err) { return done(err, false); }

        if (user) { done(null, user) }

        done(null, false);
    })
})

passport.use(jwtLogin)
passport.use(localLogin);
