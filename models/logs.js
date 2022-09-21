const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const logsSchema = new Schema({
    textarea: {type: String, required: true},
    // date: {timestamps: true},
    shipisbroken: {type: Boolean}

});

const Logs = mongoose.model('Logs', logsSchema);


module.exports = Logs