
module.exports = function (sequelize, DataTypes) {
    let Organizations = sequelize.define('organizations', {

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE(3)
        },
        updatedAt: {
            type: DataTypes.DATE(3)
        },
        isverified: {
            type: DataTypes.INTEGER
        },
        isregistered: {
            type: DataTypes.INTEGER
        },
        clientid: {
            type: DataTypes.INTEGER
        },
        debtorkey: {
            type: DataTypes.INTEGER
        }
    }
    );
    return Organizations;
};
