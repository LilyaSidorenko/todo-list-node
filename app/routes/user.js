var isLoggedIn = require('../utils/isloginin.js');
var mongoose = require('mongoose');

module.exports = (app, passport) => {
    var currentUserId;
    var currentType;

    app.get('/', (req, res) => {
        req.session.destroy();
        res.render('index.ejs');
    });

    app.post('/logout', (req, res) => {
        req.logout();
        res.status(401).json({msg: 'OK'});

    });

    app.post('/auth', passport.authenticate('local-login'), (req, res) => {
            currentType = "home";
            mongoose.connection.db.collection('items').
                find({userId: req.user._id
                    .toString(), type: currentType})
                    .sort({_id: -1})
                    .toArray((err, result) => {
                        if (err) return res.sendStatus(500);
                        res.status(200).json({msg: 'OK', result});

            });

    });

    app.post('/singup', passport.authenticate('local-signup'), (req, res) => {
        currentUserId = req.user._id.toString();
        currentType = "home";

        mongoose.connection.db.collection('items')
            .find({userId: currentUserId, type: currentType})
            .sort({_id : -1})
            .toArray((err, result) => {
                if (err) return res.sendStatus(401);
                res.status(200).json({msg: 'OK', result});
        });

    });
};