
module.exports = function (sequelize, DataTypes) {
    let Logs = sequelize.define('logs', {
        user: {
            type: DataTypes.STRING,
        },
        userid: {
            type: DataTypes.INTEGER
        },
        organization: {
            type: DataTypes.STRING,
        },
        action: {
            type: DataTypes.STRING,
        },
        detail: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE(3)
        },
        updatedAt: {
            type: DataTypes.DATE(3)
        }
    }
    );
    return Logs;
};
