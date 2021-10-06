module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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
            as: 'user',
        });
        User.hasMany(models.Beneficiaries, {
            foreignKey: 'userId',
            as: 'user',
        });
        User.hasOne(models.Wallet, {
            foreignKey: 'userId',
            as: 'user',
        });
    };
    return User;
};
