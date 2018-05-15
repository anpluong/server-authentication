// this is the model - to describe our application 
const mongoose = require('mongoose');
// tell mongoose that the particular field that the model needs
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
            //any string saved to the database, it will first turne to the lowercase.
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// on Save Hook, encrypt password
// .pre mean before save, Before saving a model, run this funcion
userSchema.pre('save', function(next) {
    // get access to the user model so you can use user.email, and user.password
    const user = this;

    //generate a salt with a certain amount of time, and take a callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        // hash (encrypte) our password using the salt. This is asynchronous. The result is stored to hash
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }

            // overwrite the plain text password with encrypted password
            user.password = hash;
            // go ahead and save it to the model.
            next();
        })
    })
})

// it basically says whenever we create a user object, it's going to have access to any functions that we defined in methods property
// we add instance method called comparePassword. candidatePassword - the password the user types in. 
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    // this refers to user model. So this.password is our hash and salted password
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(Err);
        }
        callback(null, isMatch);
    })
}

// Create the model class - load the schema to mongoose and get it back to modelClass with collection as user - class of users.
const ModelClass = mongoose.model('user', userSchema);

// Export the model. We cannot user export/import since node.js does not support it yet.
module.exports = ModelClass;