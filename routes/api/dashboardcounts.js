const db = require('../../models/index');
var Sequelize = require('sequelize');

function getDashboardCounts(req, res) {
    db.sequelize
        .query('CALL sp_getdashboardcount;', { type: db.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200);
            res.json(result);
        });

}
exports.getDashboardCounts = getDashboardCounts;