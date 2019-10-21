const express = require('express');

const router = express.Router();
const axios = require('axios');
const Page = require('../models/plain');
const Gallery = require('../models/gallery');
const middleware = require('../middleware');

/**
 * Displays the gallery index page.
 */
router.get('/gallery', (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            res.redirect('back');
        } else {
            Gallery.find({}, async (error, foundGalleries) => {
                // eslint-disable-next-line no-empty
                if (error) {
                } else {
                    res.render('../../frontend/views/galleries/index', { pages: foundPages, galleries: foundGalleries });
                }
            });
        }
    });
});

/**
 * Displays the new gallery form.
 */
router.get('/gallery/new', middleware.isLoggedIn, (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            res.redirect('back');
        } else {
            res.render('../../frontend/views/galleries/new', { pages: foundPages });
        }
    });
});

/**
 * Posts new gallery to database.
 */
router.post('/gallery', middleware.isLoggedIn, (req, res) => {
    const {
        title, cover, description, albumId, dates,
    } = req.body;
    const newGallery = {
        title, cover, description, albumId, dates,
    };
    Gallery.create(newGallery, (err) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/gallery/new');
        } else {
            res.redirect('/gallery');
        }
    });
});

/**
 * Displays the edit gallery form.
 */
router.get('/gallery/:id/edit', middleware.isLoggedIn, (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/gallery');
        } else {
            Gallery.findById(req.params.id, (error, foundGallery) => {
                if (err || !foundGallery) {
                    req.flash('error', error.message);
                    req.redirect('/gallery');
                } else {
                    res.render('../../frontend/views/galleries/edit', { gallery: foundGallery, pages: foundPages });
                }
            });
        }
    });
});

/**
 * Updates a specific gallery.
 */
router.put('/gallery/:id', middleware.isLoggedIn, (req, res) => {
    Gallery.findByIdAndUpdate(req.params.id, req.body.gallery, (err) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/gallery');
        } else {
            res.redirect('/gallery');
        }
    });
});

/**
 * Deletes a specific gallery from the database.
 */
router.delete('/gallery/:id', middleware.isLoggedIn, (req, res) => {
    Gallery.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/gallery');
        } else {
            res.redirect('/gallery');
        }
    });
});

/**
 * Displays a specific gallery.
 */
router.get('/gallery/:id/view', (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/gallery');
        } else {
            Gallery.findById(req.params.id, async (error, foundGallery) => {
                if (error || !foundGallery) {
                    req.flash('error', 'Post not found.');
                    res.redirect('/gallery');
                } else {
                    const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;
                    const response = (await axios.get(`https://photos.app.goo.gl/${foundGallery.albumId}`)).data;
                    const links = [];
                    let match;
                    // eslint-disable-next-line no-cond-assign
                    while (match = regex.exec(response)) {
                        links.push(match[1]);
                    }
                    // Removes duplicate photo
                    links.pop();
                    res.render('../../frontend/views/galleries/show', { gallery: foundGallery, pages: foundPages, imageUrls: links });
                }
            });
        }
    });
});


module.exports = router;
