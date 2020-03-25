'use strict'

var express = require('express');
var ArtigoController = require('../controllers/article');

var router = express.Router();

router.get('/dados-artigo', ArtigoController.dadosArtigo);
router.post('/salvar-artigo', ArtigoController.save);
router.get('/artigos/:last?', ArtigoController.getArtigos);
router.get('/artigo/:id', ArtigoController.getArtigosById);
router.put('/artigo/:id', ArtigoController.update);

module.exports = router;