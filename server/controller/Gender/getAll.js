const Gender = require('../../db/tablas/Gender');

const getAll = async () => Gender.findAll();

module.exports = getAll;