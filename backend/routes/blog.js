const express = require('express');

const router = express.Router();
const Post = require('../models/blog');
const Page = require('../models/plain');
const middleware = require('../middleware');

/**
 * Displays blog index page.
 */
router.get('/', (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/');
        } else {
            Post.find({}, (error, allPosts) => {
                if (error) {
                } else {
                    res.render('../../frontend/views/blogs/index', { posts: allPosts, currentUser: req.user, pages: foundPages });
                }
            });
        }
    });
});

/**
 * Displays the new blog form.
 */
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/blogs');
        } else {
            res.render('../../frontend/views/blogs/new', { pages: foundPages });
        }
    });
});

/**
 * Posts new blog to the database.
 */
router.post('/', middleware.isLoggedIn, (req, res) => {
    const {
        title, day, month, year, description, image, caption,
    } = req.body;

    const newPost = {
        title, day, month, year, description, caption, image,
    };
    Post.create(newPost, (err) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/blogs/new');
        } else {
            res.redirect('/blogs');
        }
    });
});

/**
 * Displays a specific blog.
 */
router.get('/:id', (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/blogs');
        } else {
            Post.findById(req.params.id, (error, foundPost) => {
                if (error || !foundPost) {
                    req.flash('error', 'Post not found.');
                    res.redirect('/blogs');
                } else {
                    res.render('../../frontend/views/blogs/show', { post: foundPost, currentUser: req.user, pages: foundPages });
                }
            });
        }
    });
});

/**
 * Displays the edit blog form.
 */
router.get('/:id/edit', middleware.isLoggedIn, (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/blogs');
        } else {
            Post.findById(req.params.id, (error, foundPost) => {
                if (error || !foundPost) {
                    req.flash('error', 'Something went wrong...');
                    res.redirect('/blogs');
                } else {
                    res.render('../../frontend/views/blogs/edit', { post: foundPost, pages: foundPages });
                }
            });
        }
    });
});

/**
 * Updates a specific blog.
 */
router.put('/:id', middleware.isLoggedIn, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body.post, (err) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect(`/blogs/${req.params.id}`);
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

/**
 * Deletes a specific blog from the database.
 */
router.delete('/:id', middleware.isLoggedIn, (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});

module.exports = router;
