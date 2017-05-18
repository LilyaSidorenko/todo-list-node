module.exports =  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    // res.redirect('/');
    res.sendStatus(401)
}