const db = require('../../models/index');

function checkExists(email, callback) {
    db.useraudits
        .findOne({ where: { email: email } })
        .then(result => callback(result))
}
function createUseraudit(req, res) {
    var JsonData = req.body;
    checkExists(JsonData.email, (result) => {
        if (result == null) {
            db.useraudits.create({
                email: JsonData.email,
                islocked: JsonData.islocked,
                createdAt: JsonData.date,
                updatedAt: new Date()
            }).then((data) => {
                res.status(200);
                res.json(data.get({ plain: true }));
            }).catch((error) => {
                res.status(500);
                res.json({ error: error, stackError: error.stack });
            })
        }
        else {
            req.body.id = result.id;
            updateUseraudit(req, res);
        }
    })

}
function updateUseraudit(req, res) {
    var JsonData = req.body;
    db.useraudits.update({
        islocked: JsonData.islocked,
        createdAt: JsonData.date,
        updatedAt: new Date()
    }, {
            where: { id: JsonData.id },
            returning: true,
            plain: true
        }).then((data) => {
            res.status(200);
            res.json(data);
        }).catch((error) => {
            res.status(500);
            res.json({ error: error, stackError: error.stack });
        })
}
function getUserAudit(req, res) {
    db.useraudits
        .findOne({ where: { email: req.body.email } })
        .then(result => res.json(result))
}
function deleteUseraudit(req, res) {
    var JsonData = req.body;
    db.useraudits.destroy({
        where: { email: JsonData.email },
        returning: true,
        plain: true
    }).then((data) => {
        res.status(200);
        res.json(data);
    }).catch((error) => {
        res.status(500);
        res.json({ error: error, stackError: error.stack });
    })
}
exports.createUseraudit = createUseraudit;
exports.updateUseraudit = updateUseraudit;
exports.getUserAudit = getUserAudit;
exports.deleteUseraudit = deleteUseraudit;
