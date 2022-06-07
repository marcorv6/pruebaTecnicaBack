const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.conf');

class Gender extends Model {}
Gender.init(
  {
    genderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    gender: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Gender',
    tableName: 'gender',
    timestamps: false,
  }
);

module.exports = Gender;
