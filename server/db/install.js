require('../config/config');
const colors = require('colors');
const UserType = require('./tablas/UserType')
const User = require('./tablas/User');
const Gender = require('./tablas/Gender');

const drop = async () => {
  console.log('\nPaso 1) Desinstalando la db.'.bold.blue);

  await User.drop();
  console.log('La tabla User se desinstalo correctamente.'.magenta);

  await UserType.drop();
  console.log('La tabla UserType se desinstalo correctamente.'.magenta);
  
  await Gender.drop();
  console.log('La tabla Gender se desinstalo correctamente.'.magenta);
};

const sync = async () => {
  console.log('\nPaso 2) Instalando la db.'.bold.blue);

  await Gender.sync();
  console.log('La tabla Gender se instalo correctamente.'.magenta);

  await UserType.sync();
  console.log('La tabla UserType se instalo correctamente.'.magenta);

  await User.sync();
  console.log('La tabla User se instalo correctamente.'.magenta);
};

const dataUserType = async () => {
  const data = ['Admin', 'User'];

  console.log('\nPaso 3) Instalando catalogo User Type.'.bold.blue);
  for (let i = 0; i < data.length; i++)
    await UserType.create({ userType: data[i] });
};

const dataGender = async () => {
  const data = ['Femenino', 'Masculino'];

  console.log('\nPaso 4) Instalando catalogo Gender.'.bold.blue);
  for (let i = 0; i < data.length; i++)
    await Gender.create({ gender: data[i] });
};

const exe = async () => {
  await drop();
  await sync();
  await dataUserType();
  await dataGender();
  console.log(
    '\nSe ha instalado exitosamente la base de datos.\n'.underline.bold.green
  );

  process.exit();
};

exe();
