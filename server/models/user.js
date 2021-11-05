// 'use strict';
// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   User.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     emailVerified: DataTypes.BOOLEAN,
//     isDeleted: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

// const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  User.associate = (models) => {
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'Profiles',
    });
    User.hasMany(models.Beneficiary, {
      foreignKey: 'userId',
      as: 'Beneficiaries',
    });
    User.hasOne(models.Wallet, {
      foreignKey: 'userId',
      as: 'Wallets',
    });
  };
  // Method 3 via the direct method
  // User.beforeCreate(async (user, options) => {
  //   console.log('user', user)
  //   const salt = await bcrypt.genSalt(8);
  //   const hashedPassword = await bcrypt.hash(user.password, salt);
  //   console.log('user 22', user)
  //   user.password = hashedPassword;
  // });
  return User;
};
