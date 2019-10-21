const middlewareObj = {};

/**
 * Checks if there is a user logged in.
 */
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.flash('error', 'You must be logged in to do that.');
    res.redirect('/login');
};

module.exports = middlewareObj;
