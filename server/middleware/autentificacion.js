require('../config/config');
const jwt = require('jsonwebtoken');

const verificaToken = (req, res, next) => {
  let token = req.headers.token;

  if (!token)
    return res.status(400).json({
      message: 'No hay token',
    });
  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      let message = '';

      if (err.message === 'invalid signature')
        message = 'El token no es valido. Inicia sesión de nuevo.';
      if (err.message === 'jwt expired')
        message = 'El token expiro. Inicia sesión de nuevo.';
      if (err.message === 'jwt malformed')
        message = 'Hubo un problema con el token. Inicia sesión de nuevo.';
      return res.status(401).json({ message, err: 'token error' });
    }
    req.decoded = decoded;
    next();
  });
};

const crearToken = (data) => {
  return jwt.sign({ data }, process.env.KEY, {
    expiresIn: Number(process.env.CADUCIDAD_TOKEN),
  });
};

module.exports = { verificaToken, crearToken };
