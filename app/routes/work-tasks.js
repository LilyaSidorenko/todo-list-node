const MongoClient = require("mongodb").MongoClient;
const Item = require('../models/tasks.js');
const User = require('../models/user.js');

module.exports = (app, passport) => {
    var db;
    var currentUserId;
    var currentType;

    MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
        if (err) return console.log(err);
        db = database;

    });
    //work tasks
    app.get('/work-tasks', isLoggedIn, (req, res) => {
        currentUserId = req.user._id;
        currentType = "work";

        db.collection("items").find({userId: currentUserId.toString(), type: currentType}).sort({_id : -1}).toArray((err, result) => {
            if (err) return console.log(err);
            res.render("work-tasks.ejs", {items: result});
        });


    });
    app.post('/work-tasks/tasks', function(req, res){
       var item = new Item({
            userId: currentUserId,
            title: req.body.title,
            type: req.body.type
        });
        item.save(function(error, item){
            if (error) {
                console.error(error);
                res.send(false);
            }
            res.status(200).json({msg: 'OK', item: item});
        });
    });
    app.put("/work-tasks/tasks", (req, res) => {
        db.collection("items")
            .findOneAndUpdate({title: req.body.title}, {
                $set: {
                    title: req.body.title,
                    classDone: req.body.classDone
                }
            }, {
                sort:{_id : -1},
                upsert: true
            }, (err, result) => {
                if (err) return res.send(err);
                res.send(result)
            })
    });
    app.delete("/work-tasks/tasks", (req, res) => {
        db.collection("items")
            .findOneAndDelete({title: req.body.title},
                (err) => {
                    if (err) return res.send(500, err)
                    res.json("Task was deleted")
                })
    });
};
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}