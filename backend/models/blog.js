const mongoose = require('mongoose');

/**
 * Represents a blog stored in the database.
 */
const blogSchema = new mongoose.Schema({
    title: String,
    day: String,
    year: String,
    month: String,
    description: String,
    image: String,
    caption: String,
});

module.exports = mongoose.model('Post', blogSchema);
