const Item = require('../models/tasks.js');
var isLoggedIn = require('../../public/isloginin.js');
var mongoose = require('mongoose');

module.exports = (app) => {
    var currentUserId;
    var currentType;

    //work tasks
    app.get('/work-tasks', isLoggedIn, (req, res) => {

        currentUserId = req.user._id;
        currentType = "work";

        mongoose.connection.db.collection('items').find({userId: currentUserId.toString(), type: currentType}).sort({_id : -1}).toArray((err, result) => {
            if (err) return res.send(500, err);
            res.render("work-tasks.ejs", {items: result});
        });

    });
    app.post('/work-tasks/tasks', isLoggedIn, (req, res) => {

        var item = new Item({
            userId: currentUserId,
            title: req.body.title,
            type: req.body.type
        });
        item.save(function(err, item){
            if (err) return res.send(500, err);
            res.status(200).json({msg: 'OK', item: item});
        });
        currentType = req.body.type;
    });

    app.put("/work-tasks/tasks", (req, res) => {
        mongoose.connection.db.collection('items')
            .findOneAndUpdate({title: req.body.title}, {
                $set: {
                    title: req.body.title,
                    classDone: req.body.classDone
                }
            }, {
                sort:{_id : -1},
                upsert: true
            }, (err) => {
                if (err) return res.send(500, err);
            })
    });
    app.delete("/work-tasks/tasks", (req, res) => {
        mongoose.connection.db.collection('items')
            .findOneAndDelete({title: req.body.title},
                (err) => {
                    if (err) return res.send(500, err);
                    res.json("Task was deleted")
                })
    });
};
