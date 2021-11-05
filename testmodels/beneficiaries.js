module.exports = (sequelize, DataTypes) => {
    const Beneficiary = sequelize.define('Beneficiary', {
        bankName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        accountType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preferredName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    Beneficiary.associate = (models) => {
        Beneficiary.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };
    return Beneficiary;
};
