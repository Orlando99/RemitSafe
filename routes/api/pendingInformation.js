const db = require('../../models/index');
function grabAllPending(req, res) {
    let fetchcount = parseInt(req.body.fetch);
    //sp_getallusers
    db.sequelize
        .query('CALL sp_getpendinginformation(:FETCHCOUNT)', { replacements: { FETCHCOUNT: fetchcount }, type: db.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200);
            res.json(result);
        });
}
function searchPending(req, res) {
    let search = req.body.search;
    db.sequelize
        .query('CALL sp_searchPendingInfo(:SEARCH)', { replacements: { SEARCH: search }, type: db.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200);
            res.json(result);
        });
}
function loadPendingInfo(req, res) {
    let type = req.body.type;
    let orgid = req.body.orgid;
    db.sequelize
        .query('CALL sp_fetchPendingInfoByType(:TYPE,:ORGID)', { replacements: { TYPE: type, ORGID: orgid }, type: db.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200);
            res.json(result);
        });
}
exports.grabAllPending = grabAllPending;
exports.searchPending = searchPending;
exports.loadPendingInfo = loadPendingInfo;
