const express = require('express');
const multer = require('multer');
const produtoController = require('../controllers/produtoController');
const { gerarToken, validarToken } = require('../auth');

const router = express.Router();
const upload = multer();

// Endpoints de produtos
router.post('/produtos', produtoController.cadastrar);
router.put('/produtos/:id', produtoController.editar);
router.get('/produtos', produtoController.listarTodos);
router.get('/produtos/:id', produtoController.listarPorId);
router.delete('/produtos/:id', produtoController.excluir);
router.post('/login', produtoController.login);



router.get('/protegido/:id', validarToken, (req, res) => {
  res.send({ mensagem: 'Acesso concedido!' });
});

module.exports = router;
