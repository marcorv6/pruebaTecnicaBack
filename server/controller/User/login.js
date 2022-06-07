const User = require('../../db/tablas/User');
const UserType = require('../../db/tablas/UserType');
const Gender = require('../../db/tablas/Gender');
const validar = require('../../helper/validar');
const { crearToken } = require('../../middleware/autentificacion');
const { comparar } = require('../../helper/encriptar');

const login = async (body) => {
  const user = validar.basicStrValidation(
    body.user,
    'usuario',
    true
  );
  const password = validar.basicStrValidation(
    body.password,
    'contraseña',
    false
  );

  return User.findOne({
    where: { user },
    include: [{ model: UserType }, {model: Gender}],
  }).then((res) => {
    if (!res) throw new Error('No existe este usuario.');
    if (comparar(password, res.password)) {
      delete res.dataValues.password;
      return {
        Usuario: res,
        token: crearToken(res.idUsuario),
      };
    }
    throw new Error('La contraseña es incorrecta');
  });
};

module.exports = login;