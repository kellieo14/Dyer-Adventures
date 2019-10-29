/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');
const User = require('./models/user.js');

const blogRoutes = require('./routes/blog');
const indexRoutes = require('./routes/index');
const galleryRoutes = require('./routes/gallery');
const pageRoutes = require('./routes/pages');

const port = 8080;

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        reconnectTries: 100,
        reconnectInterval: 1000,

    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(methodOverride('_method'));
app.use(flash());

/**
 * Passport Configuration
 */
app.use(require('express-session')({
    secret: 'applejacks, tacky annie, fall off the log, charleston',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use('/blogs', blogRoutes);
app.use(galleryRoutes);
app.use(pageRoutes);
app.use((req, res) => res.status(404).render('../../frontend/views/404'));

app.listen(port, () => {
    console.log(`Server is starting on: ${port}`);
});
