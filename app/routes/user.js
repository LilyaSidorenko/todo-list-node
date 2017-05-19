var isLoggedIn = require('../../public/isloginin.js');
var mongoose = require('mongoose');

module.exports = (app, passport) => {
    var currentUserId;
    var currentType;
    app.get('/', (req, res) => {
        res.render('index.ejs', {message: req.flash('loginMessage')});
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local-login', {
        failureRedirect: '/',
        failureFlash: true
    }), (req, res) => {

        currentUserId = req.user._id.toString();
        currentType = "home";

        mongoose.connection.db.collection('items').find({userId: currentUserId, type: currentType}).sort({_id : -1}).toArray((err, result) => {
            if (err) return res.sendStatus(500, err);
            res.status(200).json({msg: 'OK', result})
        });



    });

    //Singup
    app.get('/signup', (req, res) => {
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));


};