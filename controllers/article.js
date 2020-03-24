'use strict'

var Artigo = require('../models/article')
var validator = require('validator');


var controller = {

    dadosArtigo: (req, res) => {
        return res.status(200).send({
            autor: 'Anderson Ribeiro',
            url: 'https://github.com/andersonribeirosi/Master-Frameworks-JavaScript/tree/dev',
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

        // Valida dados, campos (validador)
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

            // Instancia o objeto há ser salvo
            var artigo = new Artigo();

            // Atribui valores
            artigo.title = params.title;
            artigo.content = params.content;
            artigo.image = null

            // Salva os Artigos
            artigo.save((err, artigoStored) => {

                if (err || !artigoStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'O artigo não foi salvo!!!'
                    });
                }

                // Devoler uma resposta
                return res.status(200).send({
                    status: 'success',
                    artigo: artigoStored
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Dados inválidos!!!'
            });
        }
    },

    getArtigos: (req, res) => {
        var last = req.params.last;
        var query = Artigo.find({});

        if (last || last != undefined) {
            query.limit(2);
        }

        // FindAll
        query.sort('-_id').exec((err, artigos) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Erro ao retornar os artigos!!!'
                });
            }

            if (!artigos) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Não existe nenhum artigo para listar!!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                artigos
            });
        });
    }


};

module.exports = controller;