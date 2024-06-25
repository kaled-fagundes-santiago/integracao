const jwt = require('jsonwebtoken');
const { secret } = require('./config');

function gerarToken(usuario) {
  const payload = {
    id: usuario.id,
    email: usuario.email,
    nome: usuario.nome
  };
  
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
}

function validarToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(401).send({ mensagem: 'Token não fornecido' });
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ mensagem: 'Token inválido' });
      }
      
      req.usuarioId = decoded.id;
      next();
    });
  }
  
  module.exports = { gerarToken, validarToken };