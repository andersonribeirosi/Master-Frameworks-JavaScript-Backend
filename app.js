'use strict'

// Módulos de criação e carregamento do Servidor
var express = require('express');
var bodyParser = require('body-parser');

// Executar o Express(http)
var app = express();

//Carregar arquivos e caminhos(rotas)

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS

// Prefixo para as rotas

// Rota do método para a API RestFull
app.post('/artigos', (req, res) => {

    var test = req.body.test;

    return res.status(200).send({
        autor: 'Anderson Ribeiro',
        url: 'https://github.com/andersonribeirosi/Master-Frameworks-JavaScript/tree/dev',
        test
    })
})

//Exportar modulo(arquivo atual)
module.exports = app;