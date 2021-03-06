const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * Represents a user stored in the database.
 */
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
