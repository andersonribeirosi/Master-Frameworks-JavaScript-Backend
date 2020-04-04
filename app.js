'use strict'

// Módulos de criação e carregamento do Servidor
var express = require('express');
var bodyParser = require('body-parser');

// Executar o Express(http)
var app = express();

//Carregar arquivos e caminhos(rotas)
var artigo_rotas = require('./routes/article')

//Middlewares (intermediadores)  - Validação dos valores recebidos via Json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Carregar Rotas da API e Prefixo para as rotas
app.use('/api', artigo_rotas);

//Exportar modulo(arquivo atual)
module.exports = app;