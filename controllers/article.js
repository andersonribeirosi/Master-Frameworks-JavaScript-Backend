'use strict'

var Artigo = require('../models/article')
var validator = require('validator');


var controller = {

    dadosArtigo: (req, res) => {
        var artigo = req.body.test;

        return res.status(200).send({
            autor: 'Anderson Ribeiro',
            url: 'https://github.com/andersonribeirosi/Master-Frameworks-JavaScript/tree/dev',
            artigo
        });
    },
    test: (req, res) => {
        return res.status(200).send({
            message: 'Controlador de Artigos'
        });
    },
    save: (req, res) => {

        // Coletar parâmetros por post
        var params = req.body;
        console.log(params);

        // Validar dados (validador)
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltando dados para enviar !!!'
            });
        }

        if (validate_title && validate_content) {

            // Cria o objeto para salvar
            var artigo = new Artigo();

            // Atribuir valores
            artigo.title = params.title;
            artigo.content = params.content;
            artigo.image = null

            // Salvar os Artigos
            artigo.save((err, artigoStored) => {

                if (err || !artigoStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'O artigo não foi salvo!!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    artigo
                });
            })

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Dados inválidos!!!'
            });
        }
    },
    getArtigos: (req, res) => {
        return res.status(200).send({
            status: 'success',
            message: 'Lista de Artigos'
        })
    }
};

module.exports = controller;