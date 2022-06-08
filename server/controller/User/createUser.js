const User = require('../../db/tablas/User');
const Gender = require('../../db/tablas/Gender');
const UserType = require('../../db/tablas/UserType');
const validar = require('../../helper/validar');
const { encriptar } = require('../../helper/encriptar');

const nuevo = async (body) => {
  const user = validar.isValidUser(body.user, 'usuario', true, 100, 7);
  const email = validar.isValidEmail(body.email);
  const password = validar.checkPassword(body.password, 'password', false);
  const genderId = validar.isInteger(body.genderId, "Genero", true);
  const userTypeId = validar.isInteger(body.userTypeId, "Tipo de usuario", true);

  return await Gender.findOne({where: {genderId}}).then(async res => {
    if(!res) throw new Error("Este genero no existe en la db.")
    
    return await UserType.findOne({where: {userTypeId}});
  }).then(async res => {
    if(!res) throw new Error("Este tipo de usuario no existe en la db.")

    const response = await User.create({
      user,
      email,
      password: encriptar(password),
      status: true,
      genderId: genderId,
      userTypeId: userTypeId,
    });
    delete response.dataValues.password;
    return response;
  }).then(res => {
    return "Se ha creado el usuario con éxito."
  })

};

module.exports = nuevo;
