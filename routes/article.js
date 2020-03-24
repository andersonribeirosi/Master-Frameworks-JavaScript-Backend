'use strict'

var express = require('express');
var ArtigoController = require('../controllers/article');

var router = express.Router();

router.get('/dados-artigo', ArtigoController.dadosArtigo);
router.post('/salvar-artigo', ArtigoController.save);
router.get('/artigos', ArtigoController.getArtigos);

module.exports = router;