
module.exports = function (sequelize, DataTypes) {
    let Vendors = sequelize.define('vendors', {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true
            },
            vendor_name: {
                type: DataTypes.STRING
            },
            company_name: {
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
                type: DataTypes.INTEGER
            },
            phone_number: {
                type: DataTypes.TEXT
            },
            relationship_id: {
                type: DataTypes.TEXT
            },
            status: {
                type: DataTypes.TEXT
            },
            data_joined: {
                type: DataTypes.DATE
            }
        }
    );
    return Vendors;
};

