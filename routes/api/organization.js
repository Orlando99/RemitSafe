const db = require('../../models/index');
var Sequelize = require('sequelize');
const Op = Sequelize.Op
function createOrganization(req, res) {
    var JsonData = req.body;
    insertOrganizarion(JsonData, (data) => {
        if (data != null) {
            res.status(200);
            res.json(data.get({ plain: true }));
        }
        else {
            res.status(500);
            res.json("error");
        }
    });
}
function insertOrganizarion(JsonData, callback) {
    db.organizations.create({
        // id: uuidv1(),
        name: JsonData.name,
        address1: JsonData.address1,
        address2: JsonData.address2,
        city: JsonData.city,
        state: JsonData.state,
        zip: JsonData.zip,
        country: JsonData.country,
        phone: JsonData.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
        isverified: JsonData.isverified || 0,
        isregistered: JsonData.isregistered
    }).then((data) => {
        callback(data);
    }).catch((error) => {
        console.log(error);
        callback(null);
    })
}
function findOne(req, res) {
    db.organizations
        .findOne({ where: { id: req.body.orgid } })
        .then(result => {
            var data = [];
            data.push(result);
            res.json(data);

        })
}
function findWithemail(req, res) {
    db.sequelize.query('SELECT o.id,o.name,o.address1,o.address2,o.city,o.state,o.zip,o.phone,o.isverified,u.emailaddress FROM organizations o INNER JOIN users u ON u.orgid = o.id where o.id = ' + req.body.orgid, { type: db.sequelize.QueryTypes.SELECT }).then(orgs => {
        res.status(200);
        res.json(orgs);
    })
}

function getOrganization(req, res) {
    var sql;
    if (req.body.orgid && req.body.userorgid) {
        if (!req.body.isBuyer)
            sql = 'SELECT o.*, bv.id as bvid FROM (SELECT * FROM organizations WHERE id = ' + req.body.orgid + ') as o LEFT JOIN (SELECT id, buyerid, vendorid FROM buyers2vendors WHERE buyerid = ' + req.body.userorgid + ') as bv ON o.id = bv.vendorid';
        else
            sql = 'SELECT o.*, bv.id as bvid FROM (SELECT * FROM organizations WHERE id = ' + req.body.orgid + ') as o LEFT JOIN (SELECT id, buyerid, vendorid FROM buyers2vendors WHERE vendorid = ' + req.body.userorgid + ') as bv ON o.id = bv.buyerid';
    } else {
        sql = 'SELECT * FROM organizations WHERE id = ' + req.body.orgid;
    }

    db.sequelize.query(sql, {type: db.sequelize.QueryTypes.SELECT}).then(orgs => {
        res.status(200);
        res.json(orgs);
    })
}
function getOrganizationByUserid(req, res) {
    db.sequelize
        .query('CALL sp_getorgbyuserid(:ORGID,:USERORGID,:ISBUYER)', { replacements: { ORGID: req.body.orgid, USERORGID: req.body.userorgid, ISBUYER: req.body.isbuyer }, type: db.sequelize.QueryTypes.SELECT })
        .then(result => {
            res.status(200);
            res.json(result);
        });
}

function updateOraganization(req, res) {
    var JsonData = req.body;
    db.organizations.update({
        name: JsonData.name,
        address1: JsonData.address1,
        address2: JsonData.address2,
        city: JsonData.city,
        state: JsonData.state,
        country: JsonData.country,
        zip: JsonData.zip,
        phone: JsonData.phone,
        isregistered: JsonData.isregistered
    }, {
            where: { id: JsonData.orgid },
            returning: true,
            plain: true
        }).then((data) => {
            res.status(200);
            res.json({ success: "success", data: JsonData });
        }).catch((error) => {
            res.status(500);
            res.json({ error: error, stackError: error.stack });
        })
}
function findAll(req, res) {
    if (parseInt(req.body.filterid) > 0) {
        req.body.orgid = req.body.filterid;
        findOne(req, res);
    }
    else {
        db.organizations.
            findAll({
                where: {
                    id: { [Op.notIn]: [req.body.orgid] }
                }
            }).then(orgs => { res.json(orgs) })
    }
}
function FetchAllOrgs(req, res) {
    let fetchcount = parseInt(req.body.fetch);
    if (fetchcount > 0) {
        db.organizations.
            findAll({
                limit: fetchcount,
                order: [['createdAt', 'DESC']]
            }).then(orgs => { res.json(orgs) })
    }
    else {
        db.organizations.
            findAll({
                order: [['createdAt', 'DESC']]
            }).then(orgs => { res.json(orgs) })
    }

}
function SearchOrgbyName(req, res) {
    db.sequelize.query("SELECT id,name as title FROM organizations where name like '%" + req.body.name + "%'", { type: db.sequelize.QueryTypes.SELECT }).then(orgs => {
        res.status(200);
        res.json(orgs);
    })
}
function VerifyOrg(req, res) {
    var JsonData = req.body;
    db.organizations.update({
        isverified: JsonData.isverified
    }, {
            where: { id: JsonData.orgid },
            returning: true,
            plain: true
        }).then((data) => {
            res.status(200);
            res.json({ success: "success" });
        }).catch((error) => {
            res.status(500);
            res.json({ error: error, stackError: error.stack });
        })
}

exports.createOrganization = createOrganization;
exports.findOne = findOne;
exports.updateOraganization = updateOraganization;
exports.findAll = findAll;
exports.findWithemail = findWithemail;
exports.getOrganization = findOne;
exports.insertOrganizarion = insertOrganizarion;
exports.fetchAllOrgs = FetchAllOrgs;
exports.searchOrgbyName = SearchOrgbyName;
exports.verifyOrg = VerifyOrg;
exports.getOrganizationByUserid = getOrganizationByUserid;