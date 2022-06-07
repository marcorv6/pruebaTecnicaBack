const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');
const Gender = require('./Gender');
const UserType = require('./UserType');

class User extends Model {}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      noUpdate: true,
    },
    email: {
      type: DataTypes.STRING(100),
      isEmail: true,
      unique: true,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING(100),
      isAlphanumeric: true,
      allowNull: false,
      unique: true,
      len: [7, 100],
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      len: [10, 100],
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: true,
  }
);

User.belongsTo(UserType, {
  foreignKey: {
    name: 'userTypeId',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.belongsTo(Gender, {
  foreignKey: {
    name: 'genderId',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
