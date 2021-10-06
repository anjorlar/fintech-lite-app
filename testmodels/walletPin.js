module.exports = (sequelize, DataTypes) => {
    const Beneficiaries = sequelize.define('WalletPin', {
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
    return Beneficiaries;
};
