const db = require('../../models/index');
const _ = require("underscore");
const { postageapp } = require('./postageapp');

function AddUpdateRemitInfo(req, res) {
    findOne(req.body.orgid, (result) => {
        if (result == null) {
            AddRemit(req, res);
        }
        else {
            req.body.id = result.dataValues.id;
            req.body.createdAt = result.dataValues.createdAt;
            UpdateRemit(req, res);
        }

    })

}
function AddUpdateBankInfo(req, res) {
    findOneBankInfo(req.body.orgid, (result) => {
        if (result == null) {
            AddBankInfo(req, res);
        }
        else {
            req.body.id = result.dataValues.id;
            req.body.createdAt = result.dataValues.createdAt;
            UpdateBankInfo(req, res);
        }

    })
}
function AddRemit(req, res) {
    var JsonData = req.body;
    db.remitAddressses.create({
        name: JsonData.name,
        address1: JsonData.address1,
        address2: JsonData.address2,
        city: JsonData.city,
        state: JsonData.state,
        zip: JsonData.zip,
        orgid: JsonData.orgid,
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
function UpdateRemit(req, res) {
    var JsonData = req.body;
    db.remitAddressses.update({
        name: JsonData.name,
        address1: JsonData.address1,
        address2: JsonData.address2,
        city: JsonData.city,
        state: JsonData.state,
        zip: JsonData.zip,
        orgid: JsonData.orgid,
        createdAt: JsonData.createdAt,
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
function AddBankInfo(req, res) {
    var JsonData = req.body;
    db.remitBanks.create({
        name: JsonData.name,
        accountnumber: JsonData.accountnumber,
        routingnumber: JsonData.routingnumber,
        orgid: JsonData.orgid,
        createdAt: new Date(),
        updatedAt: new Date(),
        defaultmethod: 0,
        companyname: JsonData.companyname
    }).then((data) => {
        res.status(200);
        res.json(data.get({ plain: true }));
    }).catch((error) => {
        res.status(500);
        res.json({ error: error, stackError: error.stack });
    })
}
function UpdateBankInfo(req, res) {
    var JsonData = req.body;
    db.remitBanks.update({
        name: JsonData.name,
        accountnumber: JsonData.accountnumber,
        routingnumber: JsonData.routingnumber,
        orgid: JsonData.orgid,
        createdAt: JsonData.createdAt,
        updatedAt: new Date(),
        companyname: JsonData.companyname
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
function findOne(id, callback) {
    db.remitAddressses
        .findOne({ where: { orgid: id } })
        .then(result => {
            callback(result)
        })
}
function getRemitInfo(req, res) {
    db.remitAddressses
        .findOne({ where: { orgid: req.body.orgid } })
        .then(result => res.json(result))
}
function findOneBankInfo(id, callback) {
    db.remitBanks
        .findOne({ where: { orgid: id } })
        .then(result => {
            callback(result)
        })
}

function getRemitInfo(req, res) {
    db.remitAddressses
        .findOne({ where: { orgid: req.body.orgid } })
        .then(result => res.json(result))
}
function getBankInfo(req, res) {
    db.remitBanks
        .findOne({ where: { orgid: req.body.orgid } })
        .then(result => res.json(result))
}
function getRemitandBankInfo(req, res) {
    db.sequelize.query('SELECT ra.address1,ra.address2,ra.city,ra.name AS remitName,ra.state,ra.zip,rb.accountnumber,rb.name AS bankName,rb.routingnumber,rb.approve FROM remitAddressses ra LEFT JOIN remitBanks rb ON ra.orgid = rb.orgid WHERE ra.orgid  = ' + req.body.orgid, { type: db.sequelize.QueryTypes.SELECT }).then(remit => {
        res.status(200);
        res.json(remit);
    })
}
function checkExistRemitBank(id, callback) {
    db.remitinfos
        .findOne({ where: { orgid: id } })
        .then(result => {
            callback(result)
        })
}
function AddRemitBankInfo(req, res) {
    var JsonData = req.body;
    db.remitinfos.create({
        name: JsonData.name,
        address1: JsonData.address1,
        address2: JsonData.address2,
        city: JsonData.city,
        state: JsonData.state,
        zip: JsonData.zip,
        orgid: JsonData.orgid,
        bankname: JsonData.bankname,
        accountnumber: JsonData.accountnumber,
        routingnumber: JsonData.routingnumber,
        orgid: JsonData.orgid,
        defaultmethod: 0,
        companyname: JsonData.companyname,
        approve: 0,
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
function UpdateRemitBankInfo(req, res) {
    var JsonData = req.body;
    db.remitinfos.update({
        name: JsonData.name,
        address1: JsonData.address1,
        address2: JsonData.address2,
        city: JsonData.city,
        state: JsonData.state,
        zip: JsonData.zip,
        orgid: JsonData.orgid,
        bankname: JsonData.bankname,
        accountnumber: JsonData.accountnumber,
        routingnumber: JsonData.routingnumber,
        orgid: JsonData.orgid,
        defaultmethod: 0,
        companyname: JsonData.companyname,
        approve: 0,
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
function AddUpdateRemitBankInfo(req, res) {
    AddRemitBankInfo(req, res);
    /*
    checkExistRemitBank(req.body.orgid, (result) => {
        if (result == null) {
            AddRemitBankInfo(req, res);
        }
        else {
            req.body.id = result.dataValues.id;
            req.body.createdAt = result.dataValues.createdAt;
            UpdateRemitBankInfo(req, res);
        }
    })
    */
}
function getRemitBankInfo(req, res) {
    db.sequelize.query('SELECT * FROM remitinfos WHERE orgid = ' + req.body.orgid + ' ORDER BY id DESC LIMIT 1', { type: db.sequelize.QueryTypes.SELECT }).then(remit => {
        res.status(200);
        res.json(remit[0]);
    });
    /*
    db.remitinfos
        .findOne({ where: { orgid: req.body.orgid } })
        .then(result => res.json(result))
    */    
}

function getRemitBankInfoById(req, res) {
    db.sequelize.query('SELECT * FROM remitinfos WHERE id = ' + req.body.remitid, { type: db.sequelize.QueryTypes.SELECT }).then(remit => {
        res.status(200);
        res.json(remit[0]);
    }); 
}

function getAllRemitBankInfo(req, res) {
    db.sequelize.query('SELECT * FROM remitinfos WHERE orgid = ' + req.body.orgid + ' ORDER BY id ASC', { type: db.sequelize.QueryTypes.SELECT }).then(remit => {
        res.status(200);
        res.json(remit);
    });
}

function updateRemitInfos(req, res) {
    var JsonData = req.body;
    db.remitinfos.update({
        name: JsonData.name,
        address1: JsonData.address1,
        address2: JsonData.address2,
        city: JsonData.city,
        state: JsonData.state,
        zip: JsonData.zip,
        orgid: JsonData.orgid,
        bankname: JsonData.bankname,
        accountnumber: JsonData.accountnumber,
        routingnumber: JsonData.routingnumber,
        defaultmethod: JsonData.defaultmethod,
        companyname: JsonData.companyname,
        approve: JsonData.approve,
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

function updateRemitInfosActive(req, res) {
    var orgid = req.body.orgid;
    var remitid = req.body.remitid;
    db.remitinfos.update({
        defaultmethod: 0,
        updatedAt: new Date()
    }, {
            where: { orgid: orgid },
            returning: true,
            plain: true
        }).then((data) => {
            res.status(200);
            db.remitinfos.update({
                defaultmethod: 1,
                updatedAt: new Date()
            }, {
                where: { id: remitid },
                returning: true,
                plain: true
            }).then((data) => {
                res.status(200);
                res.json(data);
            });
        }).catch((error) => {
            res.status(500);
            res.json({ error: error, stackError: error.stack });
        })
}

function sendEmailToBuyers(req, res) {
    var orgid = req.body.orgid;
    var senderOrgName = req.body.curorgname;
    db.sequelize.query('SELECT u.emailaddress, CONCAT(u.firstName, " ", u.lastName) as username FROM (SELECT * FROM buyers2vendors WHERE vendorid = ' + orgid + ') AS bv LEFT JOIN users AS u ON bv.buyerid = u.orgid', { type: db.sequelize.QueryTypes.SELECT }).then(result => {
        res.status(200);
        var recipientsObj = {};
        for(var i = 0; i < result.length; i++) {
            if(result[i].emailaddress) {
                var key = result[i].emailaddress;
                var newObj = {};
                newObj[key] = {
                    "buyer": result[i].username,
                    "vendor": senderOrgName
                };
                recipientsObj = Object.assign(newObj, recipientsObj);
            }
        }
        var options = {
            "recipients": recipientsObj,
            "template" : "Remittance-Update-Connected-ORGS"
        };
        postageapp.sendMessage(options).then((response) => {
            console.log('AAA: ', response);
            res.status(200);
            res.json({ success: "success" });
        });
    });
}

exports.AddUpdateRemitInfo = AddUpdateRemitInfo;
exports.getRemitInfo = getRemitInfo;
exports.AddUpdateBankInfo = AddUpdateBankInfo;
exports.getBankInfo = getBankInfo;
exports.getRemitandBankInfo = getRemitandBankInfo;
exports.AddUpdateRemitBankInfo = AddUpdateRemitBankInfo;
exports.getRemitBankInfo = getRemitBankInfo;
exports.getRemitBankInfoById = getRemitBankInfoById;
exports.getAllRemitBankInfo = getAllRemitBankInfo;
exports.updateRemitInfos = updateRemitInfos;
exports.updateRemitInfosActive = updateRemitInfosActive;
exports.sendEmailToBuyers = sendEmailToBuyers;