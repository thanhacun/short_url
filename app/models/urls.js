'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Url = new Schema({
   origin: String,
   short: Number,
});

module.exports = mongoose.model('Url', Url);