
module.exports = function (sequelize, DataTypes) {
    let RemitBanks = sequelize.define('remitBanks', {
        name: {
            type: DataTypes.STRING
        },
        accountnumber: {
            type: DataTypes.STRING
        },
        routingnumber: {
            type: DataTypes.STRING
        },
        orgid: {
            type: DataTypes.INTEGER
        },
        defaultmethod: {
            type: DataTypes.INTEGER
        },
        companyname: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE(3)
        },
        updatedAt: {
            type: DataTypes.DATE(3)
        },
        approve:{
            type: DataTypes.INTEGER
        }

    }
    );
    return RemitBanks;
};

