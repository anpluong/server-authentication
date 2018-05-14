exports.signup =  function(req, res, next) {    
    const email = req.body.email;
    const password = req.body.password;

    // check if a user with the given email exists in the database
}