const db = require('../../models/index');
function findOne(req, res) {
    db.logs
        .findOne({ where: { id: req.body.id } })
        .then(result => res.json(result))
}

function createLog(req, res) {
    var JsonData = req.body;
    db.logs.create({
        // id: uuidv1(),
        user: JsonData.user,
        userid: JsonData.userid,
        organization: JsonData.organization,
        action: JsonData.action,
        detail: JsonData.detail,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then((data) => {
        res.status(200);
        res.json(data.get({ plain: true }));
    }).catch((error) => {
        res.status(500);
        res.json({ error: error, stackError: error.stack });
    })
}

/*function FetchAllLogs(req, res) {
    let fetchcount = parseInt(req.body.fetch);
    //sp_getallusers
    db.sequelize
        .query('CALL sp_getallusers(:FETCHCOUNT)', { replacements: { FETCHCOUNT: fetchcount } })
        .then(result => {
            res.status(200);
            res.json(result);
        });

}*/

exports.findOne = findOne;
exports.createLog = createLog;
//exports.fetchAllUsers = FetchAllUsers;

