'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Shema;

var ArtigoSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String
}) 

module.exports = mongoose.model('Artigo', ArtigoSchema);