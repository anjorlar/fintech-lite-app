// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class WalletPin extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   WalletPin.init({
//     pin: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'WalletPin',
//   });
//   return WalletPin;
// };

module.exports = (sequelize, DataTypes) => {
  const WalletPin = sequelize.define('WalletPin', {
    pin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  WalletPin.associate = (models) => {
    WalletPin.belongsTo(models.User, {
      foreignKey: 'walletId',
      onDelete: 'CASCADE',
    });
  };
  return WalletPin;
};
