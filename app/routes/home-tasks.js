const Item = require('../models/tasks.js');
var isLoggedIn = require('../../public/isloginin.js');
var mongoose = require('mongoose');

module.exports = (app, passport) => {
    var currentUserId;
    var currentType;

    //home tasks
    app.get('/home-tasks', isLoggedIn, (req, res) => {
        currentUserId = req.user._id.toString();
        currentType = "home";
        console.log(currentUserId)

        mongoose.connection.db.collection('items').find({userId: currentUserId, type: currentType}).sort({_id : -1}).toArray((err, result) => {
            if (err) return res.sendStatus(500, err);
            res.render("home-tasks.ejs", {items: result, user: req.user});
        });
    });
    app.post('/home-tasks/tasks', (req, res) => {
        const item = { userId: currentUserId, title: req.body.title , type: req.body.type};
        mongoose.connection.db.collection('items').insert(item, (err, result) => {
                if (err) return res.sendStatus(500, err);
                res.status(200).json({msg: 'OK', item});
        });
        currentType = req.body.type;
    });

    app.put("/home-tasks/tasks", (req, res) => {
        const newItem = {title: req.body.title, classDone: req.body.classDone};
        mongoose.connection.db.collection('items')
            .findOneAndUpdate({title: req.body.title}, {
                $set: newItem
            }, {
                sort:{_id : -1},
                upsert: true
            }, (err) => {
                if (err) return res.send(500, err);
                res.status(200).json({msg: 'OK', newItem});
            })
    });
    app.delete("/home-tasks/tasks", (req, res) => {
        const deletedItem = {title: req.body.title, id: req.body._id};

        mongoose.connection.db.collection('items')
            .findOneAndDelete(deletedItem,
            (err) => {
                if (err) return res.sendStatus(500, err);
                res.status(200).json({msg: 'OK', deletedItem});
            })
    });
};
