const User = require('../../db/tablas/User');
const Gender = require('../../db/tablas/Gender');
const { encriptar } = require('../../helper/encriptar');
const {
  isInteger,
  checkPassword,
  isValidUser,
  isValidEmail,
} = require('../../helper/validar');

const updateUser = async (body) => {
  if (!body.user && !body.password && !body.email && !body.genderId)
    throw new Error('Se requieren campos para editar.');

  const userId = isInteger(body.userId, 'id usuario', true);
  const genderId = body.genderId
    ? isInteger(body.genderId, 'id genero', true)
    : '';
  const password = body.password ? encriptar(checkPassword(body.password)) : '';
  const user = body.user ? isValidUser(body.user, 'user', true, 100, 7) : '';
  const email = body.email ? isValidEmail(body.email) : '';

  const dataUpdate = {};

  if (password) dataUpdate.password = password;
  if (user) dataUpdate.user = user;
  if (email) dataUpdate.email = email;

  return Gender.findOne({ where: { genderId } })
    .then((res) => {
      if (genderId) {
        if (!res) throw new Error('No existe este genero.');
        dataUpdate.genderId = genderId;
      }

      return User.findOne({ where: { userId } });
    })
    .then((res) => {
      if (!res)
        throw new Error(
          'No existe un usuario con este id en la base de datos.'
        );

      return User.update(dataUpdate, { where: { userId } });
    })
    .then(() => ({ message: 'Se actualizó correctamente el equipo.' }));
};

module.exports = updateUser;
