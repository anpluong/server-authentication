// this is the model - to describe our application 
const mongoose = require('mongoose');
// tell mongoose that the particular field that the model needs
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
            //any string saved to the database, it will first turne to the lowercase.
    email: { type: String, unique: true, lowercase: true },
    password: String
});

// Create the model class - load the schema to mongoose and get it back to modelClass with collection as user - class of users.
const ModelClass = mongoose.model('user', userSchema);

// Export the model. We cannot user export/import since node.js does not support it yet.
module.exports = ModelClass;