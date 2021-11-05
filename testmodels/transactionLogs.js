module.exports = (sequelize, DataTypes) => {
    const TransactionLogs = sequelize.define('TransactionLogs', {
        transactionLogId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        walletId: {
            type: DataTypes.INTEGER,
        },
        transactionAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        transactionType: {
            type: DataTypes.STRING,
            // type: DataTypes.ENUM, ['debit','credit']
            defaultValue: false,
        },
        fundedWith: {
            type: DataTypes.STRING,
            // type: DataTypes.ENUM,['card','transfer']
            defaultValue: false,
        },
    });
    TransactionLogs.associate = (models) => {
        TransactionLogs.belongsTo(models.Wallet, {
            foreignKey: 'walletId',
            onDelete: 'CASCADE',
        });
    };
    return TransactionLogs;
};
