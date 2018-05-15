const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy  = require('passport-local')

// create local strategy, 
// we you want to get access to username, look at email property. The local strategy is going to look at the 
// request body and it's going to find this password field for us.
const localOptions = { usernameField: 'email'}

const localLogin = new LocalStrategy (localOptions, function(email, password, done){
    // verify this email and password, call done with this user, 
    // if it is correct email and password, otherwise, call done with false. 

    User.findOne({email: email}, function(err, user) {
        if (err) { 
            return done(err);
        }
        if (!user) {
            // null means no error, false mean no email found
            return done(null, false)
        }
        // compare password is `password` equal to user.password?
        user.comparePassword(password, function(err, isMatch) {   
            if (err) { return done(err); }
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        })
    })
}) 

// setup options for jwt strategy
const jwtOptions = {
    // we tell jwt that whenever the incoming requests come in, we want our passport to handle it, look at the header - authorization to
    // find a token. 
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy, the second argument is the function when we need to authenticate a user with a token. 
// payload is the decoded JWT token, done is the callback when we authenticated the user
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // On the payload, we have the sub property
    // see if the user in the payload exists in our database.
    // if it does, call 'done with that user, otherwise, call done without a user object. 
    User.findById(payload.sub, function(err, user) {
        if (err) {
            // false means that we dont find the user
            return done(err, false);
        }
        if (user) {
            done(null, user)
        }
        else {
            done(null, false)
        }
    })
})

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);