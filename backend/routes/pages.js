const express = require('express');

const router = express.Router();
const Page = require('../models/plain');
const middleware = require('../middleware');

/**
 * Displays the new page form.
 */
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/');
        } else {
            res.render('../../frontend/views/pages/new.ejs', { pages: foundPages });
        }
    });
});

/**
 * Displays the edit page form.
 */
router.get('/:pageName/edit', middleware.isLoggedIn, (req, res) => {
    const page = req.params.pageName;
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect(`/${page}`);
        } else {
            Page.findOne({ pageName: page }, (error, foundPage) => {
                if (err || !foundPage) {
                    req.flash('error', 'Page not found');
                    res.redirect(`/${page}`);
                } else {
                    res.render('../../frontend/views/pages/edit', { pages: foundPages, page: foundPage });
                }
            });
        }
    });
});

/**
 * Updates a specific page.
 */
router.put('/:pageName', middleware.isLoggedIn, (req, res) => {
    const page = req.params.pageName;
    Page.findOneAndUpdate({ pageName: page }, req.body.page, (err) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect(`/${page}`);
        } else {
            res.redirect(`/${page}`);
        }
    });
});

/**
 * Displays the page index.
 */
router.get('/:pageName', (req, res) => {
    const page = req.params.pageName;
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/');
        } else {
            Page.findOne({ pageName: page }, (error, foundPage) => {
                if (error || !foundPage) {
                    req.flash('error', 'Page not found');
                    res.redirect('/');
                } else {
                    res.render('../../frontend/views/pages/index', { page: foundPage, currentUser: req.user, pages: foundPages });
                }
            });
        }
    });
});

/**
 * Posts new page to database.
 */
router.post('/', middleware.isLoggedIn, (req, res) => {
    const pageName = req.body.pageName.toLowerCase();
    const { title, content, image } = req.body;
    Page.find({ pageName }, (err, foundPage) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/');
        } else if (foundPage.length > 0) {
            req.flash('error', `A page with the name '${pageName.charAt(0).toUpperCase()}${pageName.slice(1).toLowerCase()}' already exists.`);
            res.redirect('back');
        } else {
            const newPage = {
                pageName, title, content, image,
            };
            Page.create(newPage, (error) => {
                if (error) {
                    req.flash('error', err.message);
                    res.redirect('back');
                } else {
                    res.redirect(`/${pageName}`);
                }
            });
        }
    });
});

/**
 * Deletes a specific page.
 */
router.delete('/:pageName', middleware.isLoggedIn, (req, res) => {
    const page = req.params.pageName;
    Page.findOneAndRemove({ pageName: page }, (err, removedPage) => {
        if (err || !removedPage) {
            req.flash('error', 'Something went wrong');
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
