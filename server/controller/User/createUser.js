const User = require('../../db/tablas/User');
const validar = require('../../helper/validar');
const { encriptar } = require('../../helper/encriptar');

const nuevo = async (body) => {
  const user = validar.isValidUser(body.user, 'usuario', true, 100, 7);
  const email = validar.isValidEmail(body.email);
  const password = validar.checkPassword(body.password, 'password', false);
  const genderId = validar.isInteger(body.genderId, "Genero", true);
  const userTypeId = validar.isInteger(body.userTypeId, "Tipo de usuario", true);

  const res = await User.create({
    user,
    email,
    password: encriptar(password),
    status: true,
    genderId: genderId,
    userTypeId: userTypeId,
  });
  delete res.dataValues.password;
  return res;
};

module.exports = nuevo;
