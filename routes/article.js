'use strict'

var express = require('express');
var ArtigoController = require('../controllers/article');

var router = express.Router();

// módulo multiparty(connect multiparty)
var multiparty = require('connect-multiparty')
var md_upload = multiparty({uploadDir: './upload/articles'})

// Rotas
router.get('/dados-artigo', ArtigoController.dadosArtigo);
router.post('/salvar-artigo', ArtigoController.save);
router.get('/artigos/:last?', ArtigoController.getArtigos);
router.get('/artigo/:id', ArtigoController.getArtigosById);
router.put('/artigo/:id', ArtigoController.update);
router.delete('/artigo/:id', ArtigoController.delete);
router.post('/upload-imagem/:id', md_upload, ArtigoController.upload);
router.get('/get-imagem/:image', ArtigoController.getImage);

module.exports = router; 