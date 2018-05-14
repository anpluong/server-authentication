const User = require('../models/user');

exports.signup =  function(req, res, next) {    
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
       return res.status(422).send({error: 'You must provide email and password'})
    }

    // check if a user with the given email exists in the database
    User.findOne({email: email}, function(err, existingUser) {
        
        if (err) {
            return next(err);
        }

        // if a user with email does exist, return an error
        if (existingUser) {
            // 422 means unable to process or inappropriate
            return res.status(422).send({error: 'Email is in use'})
        }

        // if a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        })

        // save the record to the database and it is asynchronous
        user.save(function(err) {
            if (err) { 
                return next(err);
            }
            // Respond to request indicating the user was created
            res.json(user);
        });
    })
}