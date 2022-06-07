const User = require('../../db/tablas/User');
const UserType = require('../../db/tablas/UserType');
const Gender = require('../../db/tablas/Gender');
const { isInteger } = require('../../helper/validar');

const users = async (query) => {
  const page = isInteger(query.page, 'página', false);

  return User.findAndCountAll({
    include: [ {model: UserType}, {model: Gender}],
    limit: 25,
    offset: 25 * (page - 1),
  })
};

module.exports = users;