
module.exports = function (sequelize, DataTypes) {
    let Useraudits = sequelize.define('useraudits', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        islocked: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE(3)
        },
        updatedAt: {
            type: DataTypes.DATE(3)
        }

    }
    );
    return Useraudits;
};
