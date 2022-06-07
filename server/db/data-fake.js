const User = require('./tablas/User');
const { encriptar } = require('../helper/encriptar');

const dataUsuarios = async () => {
  let usuario = ['UserAdmin', 'NormalUser',];
  let correo = ['admin@admin.com', 'user@user.com']
  let password = ['AdminPa$$word1', 'UserPa$$word1']


  for (let i = 0; i < usuario.length; i++) {
    await User.create({
      user: usuario[i],
      email: correo[i],
      password: encriptar(password[i]),
      status: true,
      genderId: i+1,
      userTypeId: i+1,
    });
    console.log(`Se insertó el usuario ${usuario[i]}.`.magenta);
  }
};

const exec = async () => {
  await dataUsuarios();
  console.log(
    '\nSe ha instalado exitosamente la información falsa en la base de datos.\n'
      .underline.bold.green
  );
  process.exit();
};

exec();
