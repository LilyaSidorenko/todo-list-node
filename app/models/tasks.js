var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    classDone: {type: String},
    title: {type: String, required: true},
    userId: {type: String, required: true},
    type: {type: String, required: true}
});

module.exports = mongoose.model('Item', itemSchema);
