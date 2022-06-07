const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');

class UserType extends Model {}
UserType.init(
  {
    userTypeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    userType: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UserType',
    tableName: 'user_type',
    timestamps: false,
  }
);

module.exports = UserType;
