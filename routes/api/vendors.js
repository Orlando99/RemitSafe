const db = require('../../models/index');
const { insertOrganizarion } = require('./organization');
const { insertUser, checkExists } = require('./users')
const { postageapp } = require('./postageapp');
const config = require(__dirname + '/../../config/config.json')['development'];
function AddVendorReq(req, res) {
    var JsonData = req.body;
    db.vendoraddrequest.create({
        companyname: JsonData.companyname,
        contactname: JsonData.contactname,
        phone: JsonData.phone,
        email: JsonData.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        userid: JsonData.userid,
        isbuyer: JsonData.isbuyer == true ? 1 : 0
    }).then((data) => {
        res.status(200);
        var variables;
        var link = config.weburl + 'register?email=' + JsonData.email + '&company=' + JsonData.companyname;
        if (JsonData.isbuyer) {
            variables = {
                buyerconfirmlink: link,
                requester: JsonData.requester
            }
        }
        else {
            variables = {
                name: JsonData.email,
                link: link,
                requester: JsonData.requester
            }
        }
        var options = {
            recipients: JsonData.email,
            template: JsonData.isbuyer ? 'buyer-add' : 'Vendor-Add',
            variables: variables
        }
        console.log(options);
        postageapp.sendMessage(options).then((response) => {
            checkExists(JsonData.email, (checkemail) => {
                if (checkemail == null) {
                    var orgData = {
                        name: JsonData.companyname,
                        address1: '',
                        address2: '',
                        city: '',
                        state: '',
                        zip: '',
                        country: '',
                        phone: JsonData.phone,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        isverified: 0
                    }
                    insertOrganizarion(orgData, (data) => {
                        if (data == null) {
                            res.json('error');
                        }
                        else {
                            var orgData = data.get({ plain: true });

                            var userData = {
                                email: JsonData.email,
                                firstname: '',
                                lastname: '',
                                orgid: orgData.id
                            }
                            insertUser(userData, (user) => {
                                var userData = user.get({ plain: true });
                                req.body.userorgid = JsonData.orgid;
                                req.body.orgid = orgData.id;

                                if (JsonData.isbuyer == true) {
                                    AssgineBuyer(req, res);

                                }
                                else {
                                    AssgineVendor(req, res);
                                }
                            })

                        }

                    })
                }
                else {
                    res.json('error');
                }

            })


        }).catch((error) => {
            res.json({ error: error, stackError: error.stack });
        });

    }).catch((error) => {
        res.status(500);
        res.json({ error: error, stackError: error.stack });
    })
}

function AssgineVendor(req, res) {
    db.buyers2vendors
        .findOne({ where: { buyerid: req.body.userorgid, vendorid: req.body.orgid } })
        .then(result => {
            if (result == null) {
                AddAssgineVendor(req, res);
            }
            else {
                res.status(200);
                res.json({ info: 'already' });
            }
        })
}
function AssgineBuyer(req, res) {
    db.buyers2vendors
        .findOne({ where: { buyerid: req.body.orgid, vendorid: req.body.userorgid } })
        .then(result => {
            if (result == null) {
                AddAssgineBuyer(req, res);
            }
            else {
                res.status(200);
                res.json({ info: 'already' });
            }
        })
}
function UnassgineBuyerVendor(req, res) {
    var JsonData = req.body;
    db.buyers2vendors.destroy(
        {
            where: { id: JsonData.orgid }
        }
    ).then((data) => {
        res.status(200);
        res.json({ success: "success" });
    }).catch((error) => {
        res.status(500);
        res.json({ error: error, stackError: error.stack });
    })
}
function AddAssgineVendor(req, res) {
    db.buyers2vendors.create({
        buyerid: req.body.userorgid,
        vendorid: req.body.orgid,
        createdAt: new Date(),
        updatedAt: new Date(),
        linkverify: 0,
        isbuyer: 0
    }).then((data) => {
        res.status(200);
        res.json(data.get({ plain: true }));
    }).catch((error) => {
        res.status(500);
        res.json({ error: error, stackError: error.stack });
    })
}
function AddAssgineBuyer(req, res) {
    db.buyers2vendors.create({
        buyerid: req.body.orgid,
        vendorid: req.body.userorgid,
        createdAt: new Date(),
        updatedAt: new Date(),
        linkverify: 0,
        isbuyer: 1
    }).then((data) => {
        res.status(200);
        res.json(data.get({ plain: true }));
    }).catch((error) => {
        res.status(500);
        res.json({ error: error, stackError: error.stack });
    })
}
function findVendorByBuyer(req, res) {
    db.vendoraddrequest.
        findAll({ where: { buyerid: req.body.buyerid } }).then(vendors => { res.json(vendors) })
}
function getBuyerFromVendor(req, res) {
    db.sequelize.query('SELECT bu.id,bu.linkverify,o.isverified,o.isregistered,o.name,o.address1,o.phone, o.id as orgid FROM buyers2vendors bu inner join organizations o on o.id=vendorid where buyerid=' + req.body.orgid, { type: db.sequelize.QueryTypes.SELECT }).then(vendors => {
        res.status(200);
        res.json(vendors);
    })
}
function getBuyerFromVendorCount(req, res) {
    db.sequelize.query('SELECT count(*) as Count FROM buyers2vendors inner join organizations o on o.id=vendorid where buyerid=' + req.body.orgid, { type: db.sequelize.QueryTypes.SELECT }).then(vendors => {
        res.status(200);
        res.json(vendors[0]);
    })
}
function searchVendor(req, res) {
    db.sequelize.query("SELECT id,name as title FROM organizations where name like '%" + req.body.name + "%'", { type: db.sequelize.QueryTypes.SELECT }).then(vendors => {
        res.status(200);
        res.json(vendors);
    })
}
function getVendorFromBuyer(req, res) {
    db.sequelize.query('SELECT bu.id,bu.linkverify,o.isverified,o.isregistered,o.name,o.address1,o.phone,o.id as orgid FROM buyers2vendors bu inner join organizations o on o.id=buyerid where vendorid=' + req.body.orgid, { type: db.sequelize.QueryTypes.SELECT }).then(buyers => {
        res.status(200);
        res.json(buyers);
    })
}
function getVendorFromBuyerCount(req, res) {
    db.sequelize.query('SELECT count(*) as Count FROM buyers2vendors inner join organizations o on o.id=buyerid where vendorid=' + req.body.orgid, { type: db.sequelize.QueryTypes.SELECT }).then(buyers => {
        res.status(200);
        res.json(buyers[0]);
    })
}
function sendVerificationEmail(req, res) {
    var JsonData = req.body;
    var variables;
    variables = {
        confirmlink: config.weburl + 'verifyorg?data=' + JsonData.id, //'http://localhost:3000/verifyorg?data=' + JsonData.id,
        email: JsonData.email,
        requester: JsonData.companyname,
        category: JsonData.isBuyer ? "Buyer" : "Vendor"
    }
    var options = {
        recipients: JsonData.email,
        template: 'linked-verified ',
        variables: variables
    }
    postageapp.sendMessage(options).then((response) => {
        res.json('success');
    }).catch((error) => {
        res.json({ error: error, stackError: error.stack });
    });
}
function VerifyAssociation(req, res) {
    var JsonData = req.body;
    db.buyers2vendors.update({
        linkverify: 1,
        updatedAt: new Date()
    }, {
            where: { id: JsonData.id },
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
function GetBVLinkDetailsByOrg(req, res) {
    console.log(req.body)
    db.sequelize
        .query('CALL sp_getbuyervendorlinkbyorgid(:ORGID)',
            {
                replacements: { ORGID: req.body.orgid },
                type: db.sequelize.QueryTypes.SELECT
            })
        .then(result => {
            res.status(200);
            res.json(result);
        });
}
exports.AddVendorReq = AddVendorReq;
exports.findVendorByBuyer = findVendorByBuyer;
exports.AssgineVendor = AssgineVendor;
exports.getBuyerFromVendor = getBuyerFromVendor;
exports.searchVendor = searchVendor;
exports.getBuyerFromVendorCount = getBuyerFromVendorCount
exports.AssgineBuyer = AssgineBuyer;
exports.getVendorFromBuyer = getVendorFromBuyer;
exports.getVendorFromBuyerCount = getVendorFromBuyerCount;
exports.UnassgineBuyerVendor = UnassgineBuyerVendor;
exports.sendVerificationEmail = sendVerificationEmail;
exports.VerifyAssociation = VerifyAssociation;
exports.GetBVLinkDetailsByOrg = GetBVLinkDetailsByOrg;