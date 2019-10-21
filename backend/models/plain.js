const mongoose = require('mongoose');

/**
 * Represents a page stored in the database.
 */
const pageSchema = new mongoose.Schema({
    pageName: String,
    title: String,
    content: String,
    image: String,
});

module.exports = mongoose.model('Page', pageSchema);
