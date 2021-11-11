// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class TransactionLog extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   TransactionLog.init({
//     transactionAmount: DataTypes.DECIMAL,
//     transactionType: DataTypes.STRING,
//     fundedWith: DataTypes.ENUM
//   }, {
//     sequelize,
//     modelName: 'TransactionLog',
//   });
//   return TransactionLog;
// };

module.exports = (sequelize, DataTypes) => {
  const TransactionLog = sequelize.define('TransactionLog', {
    transactionAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.STRING,
      // type: DataTypes.ENUM, ['debit','credit']
    },
    fundedWith: {
      type: DataTypes.STRING,
      // type: DataTypes.ENUM,['card','transfer']
    },
    transactionStatus: {
      type: DataTypes.STRING,
      // type: DataTypes.ENUM,['card','transfer']
    },
  });
  TransactionLog.associate = (models) => {
    TransactionLog.belongsTo(models.Wallet, {
      foreignKey: 'walletId',
      onDelete: 'CASCADE',
    });
  };
  return TransactionLog;
};
