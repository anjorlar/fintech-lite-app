// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Profile extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Profile.init({
//     bvn: DataTypes.INTEGER,
//     isVerified: DataTypes.BOOLEAN
//   }, {
//     sequelize,
//     modelName: 'Profile',
//   });
//   return Profile;
// };

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    bvn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Profile;
};
