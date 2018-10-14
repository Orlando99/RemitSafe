
module.exports = function (sequelize, DataTypes) {
    let Vendoraddrequest = sequelize.define('vendoraddrequest', {
        companyname: {
            type: DataTypes.STRING
        },
        contactname: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        userid: {
            type: DataTypes.STRING
        },
        isbuyer: {
            type: DataTypes.INTEGER
        }
    }
    );
    return Vendoraddrequest;
};

