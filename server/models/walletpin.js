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

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const WalletPin = sequelize.define('WalletPin', {
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  WalletPin.associate = (models) => {
    WalletPin.belongsTo(models.User, {
      foreignKey: 'walletId',
      onDelete: 'CASCADE',
    });
  };
  // Method 3 via the direct method
  // WalletPin.beforeCreate(async (userPin, options) => {
  //   console.log('user', userPin)
  //   const salt = await bcrypt.genSalt(8);
  //   const hashedPin = await bcrypt.hash(userPin.pin, salt);
  //   console.log('user 22', userPin)
  //   userPin.pin = hashedPin;
  // });
  return WalletPin;
};
