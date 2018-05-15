const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport');

// no session is created after authentication.
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});
module.exports = function(app) {
    // req - short for request is an object represent http incoming request. 
    // res - response that we are going to form up and sent back whoever made the request.

    app.get('/', requireAuth, function(req, res) {
        res.send({hi: 'there'})
    });

    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}
