// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Beneficiary extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Beneficiary.init({
//     bankName: DataTypes.STRING,
//     accountNo: DataTypes.INTEGER,
//     accountType: DataTypes.STRING,
//     preferredName: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Beneficiary',
//   });
//   return Beneficiary;
// };

module.exports = (sequelize, DataTypes) => {
  const Beneficiary = sequelize.define('Beneficiary', {
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferredName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  Beneficiary.associate = (models) => {
    Beneficiary.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Beneficiary;
};
