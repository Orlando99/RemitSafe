
module.exports = function (sequelize, DataTypes) {
    let buyers2vendors = sequelize.define('buyers2vendors', {

        buyerid: {
            type: DataTypes.INTEGER,
        },
        vendorid: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE(3)
        },
        updatedAt: {
            type: DataTypes.DATE(3)
        },
        linkverify:{
            type: DataTypes.INTEGER,
        },
        isbuyer:{
            type: DataTypes.INTEGER,
        }
    }
    );
    return buyers2vendors;
};
