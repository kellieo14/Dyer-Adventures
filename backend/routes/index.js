const express = require('express');

const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Page = require('../models/plain');
const middleware = require('../middleware');

/**
 * Displays the register user form.
 */
router.get('/register', middleware.isLoggedIn, (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/login');
        } else {
            res.render('../../frontend/views/register', { pages: foundPages });
        }
    });
});

/**
 * Posts a new user to the database.
 */
router.post('/register', middleware.isLoggedIn, (req, res) => {
    const newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            req.flash('err', err.message);
            res.redirect('/register');
        }
        req.flash('success', 'New admin account added.');
        res.redirect('/');
    });
});

/**
 * Displays login form.
 */
router.get('/login', (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            res.render('../../frontend/views/login', { pages: foundPages });
        }
    });
});

/**
 * Login user.
 */
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/admin',
        failureRedirect: '/login',
    }));

/**
 * Logs out user.
 */
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

/**
 * Displays admin page.
 */
router.get('/admin', middleware.isLoggedIn, (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/');
        } else {
            User.find({}, (error, foundUsers) => {
                if (error) {
                    res.redirect('back');
                } else {
                    res.render('../../frontend/views/admin', { pages: foundPages, users: foundUsers });
                }
            });
        }
    });
});


/**
 * Displays the homepage.
 */
router.get('/', (req, res) => {
    Page.find({}, (err, foundPages) => {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/');
        } else {
            // res.send("home page");
            res.render('../../frontend/landing', { pages: foundPages });
        }
    });
});

module.exports = router;
