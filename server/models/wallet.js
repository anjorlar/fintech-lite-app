// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Wallet extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Wallet.init({
//     availableBalance: DataTypes.DECIMAL,
//     hasPin: DataTypes.BOOLEAN,
//     isDeleted: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Wallet',
//   });
//   return Wallet;
// };

module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    availableBalance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },
    hasPin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Wallet.hasOne(models.WalletPin, {
      foreignKey: 'walletId',
      as: 'Wallets',
    });
    Wallet.hasMany(models.TransactionLog, {
      foreignKey: 'walletId',
      as: 'TransactionLogs',
    });
  };
  return Wallet;
};
