'use strict'

var Artigo = require('../models/article')
var validator = require('validator');

var fs = require('fs');
var path = require('path');


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
    upload: (req, res) => {

        // Variável do arquivo (nome)
        var file_name = 'Imagem não subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Acessar e guardar o nome e a extensão do arquivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // Arquivo
        var file_name = file_split[2];

        // Extensão do arquivo
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];


        // Testando condição das extensões das imagens(arquivo)
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif' && file_ext != 'pdf') {
            fs.unlink(file_path, (err) => {
                return res.status(404).send({
                    status: 'error',
                    message: 'O formato do arquivo não é válido!'
                });
            });
        } else {

            var artigoId = req.params.id;

            Artigo.findOneAndUpdate({ _id: artigoId }, { image: file_name }, { new: true }, (err, artigoUpdated) => {

                if (err || !artigoUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Erro ao salvar a imagem do artigo'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    artigo: artigoUpdated
                });
            });

        }

    },
    update: (req, res) => {
        // Guardando o ID em artigoId
        var artigoId = req.params.id;

        // Pega o objeto (atributos da requisição) na variável params
        var params = req.body;

        // Validando os dados
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'Faltando dados para enviar !!!'
            });
        }

        if (validate_content && validate_title) {
            // Buscar e atualizar
            Artigo.findOneAndUpdate({ _id: artigoId }, params, { new: true }, (err, artigoUpdated) => {

                // testa as condições de validação
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Erro na atualização!!!'
                    });
                }

                if (!artigoUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'O artigo não existe!!!'
                    });
                }

                // Artigo atualizado
                return res.status(200).send({
                    status: 'success',
                    artigo: artigoUpdated
                });
            })
        } else {
            // Devolve uma resposta com um erro
            return res.status(404).send({
                status: 'error',
                message: 'Ocorreu um erro na validação!!!'
            });
        }
    },
    getImage: (req, res) => {

        var file_image = req.params.image;
        var file_path = './upload/articles/' + file_image;

        fs.exists(file_path, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(file_path));
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'A Imagem não existe!'
                });
            }
        })

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
                    return res.status(400).send({
                        status: 'error',
                        message: 'O artigo não foi salvo!!!'
                    });
                }

                // Devolver uma resposta
                return res.status(200).send({
                    status: 'success',
                    artigo: artigoStored
                });
            });

        } else {
            return res.status(404).send({
                status: 'error',
                message: 'Dados inválidos!!!'
            });
        }
    },

    getArtigosById: (req, res) => {
        var buscarArtigoPorId = req.params.id;

        if (!buscarArtigoPorId || buscarArtigoPorId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'Não existe o artigo!!!'
            });
        }

        Artigo.findById(buscarArtigoPorId, (err, artigo) => {

            if (err || !artigo) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Não existe o artigo!!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                artigo
            });
        });

    },
    delete: (req, res) => {

        var artigoId = req.params.id;

        // find and delete
        Artigo.findOneAndDelete({ _id: artigoId }, (err, artigoDeleted) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Erro ao remover'
                })
            }

            if (!artigoDeleted) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Este Artigo não existe'
                })
            }

            return res.status(200).send({
                status: 'success',
                artigos: artigoDeleted
            });
        });
    },

    // FindAll - Listando os artigos mais recentes - sort('-_id')
    getArtigos: (req, res) => {
        var last = req.params.last;
        var query = Artigo.find({});

        // Condição que retorna um limite máximo de artigos listados
        if (last || last != undefined) {
            query.limit(2);
        }

        // Método que retorna uma lista de artigos por ID
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
                    message: 'Não existe artigo para listar!!!'
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