const UserType = require('../../db/tablas/UserType');

const getAll = async () => UserType.findAll();

module.exports = getAll;
