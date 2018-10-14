
module.exports = function (sequelize, DataTypes) {
    let RemitBankInfos = sequelize.define('remitinfos', {
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
        bankname: {
            type: DataTypes.STRING
        },
        accountnumber: {
            type: DataTypes.STRING
        },
        routingnumber: {
            type: DataTypes.STRING
        },
        defaultmethod: {
            type: DataTypes.INTEGER
        },
        companyname: {
            type: DataTypes.STRING
        },
        approve: {
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
    return RemitBankInfos;
};

