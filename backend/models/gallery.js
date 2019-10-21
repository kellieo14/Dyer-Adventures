const mongoose = require('mongoose');

/**
 * Represents a gallery stored in the database.
 */
const gallerySchema = new mongoose.Schema({
    albumId: String,
    cover: String,
    title: String,
    description: String,
    dates: String,
});

module.exports = mongoose.model('gallery', gallerySchema);
