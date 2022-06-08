const User = require('../../db/tablas/User');
const { isInteger } = require('../../helper/validar');

const deactivateUser = async (body) => {
  const userId = isInteger(
    body.userId,
    'id usuario',
    true
  );

  const user = await User.findOne({ where: userId });
  if (!user) throw new Error('No existe este usuario.');
  return user.update({ status: !user.status });
};

module.exports = deactivateUser;