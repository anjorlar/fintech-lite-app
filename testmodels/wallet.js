module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        walletId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        availableBalance: {
            type: DataTypes.DECIMAL,
            allowNull: false,
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
            as: 'wallet',
        });
        Wallet.hasMany(models.TransactionLogs, {
            foreignKey: 'walletId',
            as: 'wallet',
        });
    };
    return Wallet;
};
