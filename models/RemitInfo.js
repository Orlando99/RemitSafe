
module.exports = function (sequelize, DataTypes) {
    let RemitAddressses = sequelize.define('remitAddressses', {
        name: {
            type: DataTypes.STRING
        },
        address1: {
            type: DataTypes.STRING
        },
        address2: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zip: {
            type: DataTypes.STRING
        },
        orgid: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE(3)
        },
        updatedAt: {
            type: DataTypes.DATE(3)
        }
    }
    );
    return RemitAddressses;
};

