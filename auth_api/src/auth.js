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
  const token = req.headers.authorization;
  const id = req.params.id;

  if (!token) {
      return res.status(401).json({ auth: false });
  }

  jwt.verify(token, secret, (err, decoded) => {
      if (err) {
          return res.status(401).json({ auth: false });
      }
      if (id == decoded.id) {
          res.status(200).json({ auth: true });
          next();
      } else {
          return res.status(401).json({ auth: false });
      }
  });
}
  
  module.exports = { gerarToken, validarToken };