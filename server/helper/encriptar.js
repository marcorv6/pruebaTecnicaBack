const bcrypt = require('bcrypt');
require('../config/config');

const comparar = (password, dbPassword) => {
  if (!bcrypt.compareSync(password, dbPassword)) return false;
  return true;
};

const encriptar = (password) =>
  bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS));

const generarPassword = () => {
  const length = 8;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';

  for (let i = 0, n = charset.length; i < length; ++i)
    password += charset.charAt(Math.floor(Math.random() * n));
  return password;
};

module.exports = { comparar, encriptar, generarPassword };
