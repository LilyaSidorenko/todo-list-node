var isLoggedIn = require('../../public/isloginin.js');
var mongoose = require('mongoose');

module.exports = (app, passport) => {
    var currentType;

    //home tasks



    app.delete("/remove", (req, res) => {
        const deletedItem = {title: req.body.title, id: req.body._id};

        mongoose.connection.db.collection('items')
            .findOneAndDelete(deletedItem,
                (err) => {
                    if (err) return res.sendStatus(500, err);
                    res.status(200).json({msg: 'OK', deletedItem});
                })
    });
    app.put("/update", (req, res) => {
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

};
