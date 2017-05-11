module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/categories', isLoggedIn, function(req, res) {
        res.render('categories.ejs', { message: req.flash('loginMessage') });
    });

    // logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
    app.post('/', passport.authenticate('local-login', {
        successRedirect : '/categories',
        failureRedirect : '/',
        failureFlash : true
    }));

    //Singup
    app.get('/signup', (req, res) => {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/categories',
        failureRedirect : '/signup',
        failureFlash : true
    }));


};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}