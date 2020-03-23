'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_artigos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Conectado com sucesso com a base de dados");
    
        app.listen(port, () => {
            console.log('Servidor rodando em http://localhost:' + port);
            
        })
    })