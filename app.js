'use strict'

// Módulos de criação e carregamento do Servidor
var express = require('express');
var bodyParser = require('body-parser');

// Executar o Express(http)
var app = express();

//Carregar arquivos e caminhos(rotas)
var artigo_rotas = require('./routes/article')

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS

// Carregar Rotas da API e Prefixo para as rotas
app.use('/api', artigo_rotas);

//Exportar modulo(arquivo atual)
module.exports = app;