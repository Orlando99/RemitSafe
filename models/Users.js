
module.exports = function (sequelize, DataTypes) {
    let Users = sequelize.define('users', {

        emailaddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.TEXT
        },
        orgid: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE(3)
        },
        updatedAt: {
            type: DataTypes.DATE(3)
        },
        isemailverify: {
            type: DataTypes.INTEGER,
        },
        usertype: {
            type: DataTypes.STRING
        },
        permission: {
            type: DataTypes.INTEGER
        },
        nowverify: {
            type: DataTypes.INTEGER
        }

    }
    );
    return Users;
};
