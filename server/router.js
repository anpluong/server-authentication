
const Authentication = require('./controllers/authentication')


module.exports = function(app) {
    // req - short for request is an object represent http incoming request. 
    // res - response that we are going to form up and sent back whoever made the request.

    app.post('/signup', Authentication.signup);
}
