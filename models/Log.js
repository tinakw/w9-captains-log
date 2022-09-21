const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const logSchema = new Schema({
    title: {type: String, required: true},
    entry: {type: String},
    // date: {timestamps: true},
    shipisbroken: {type: Boolean, default: true},

});

const Log = model('Log', logSchema);


module.exports = Log;

