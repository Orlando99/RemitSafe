const db = require('../../models/index');
const uuidv1 = require('uuid/v1');
const { postageapp } = require('./postageapp');
const config = require(__dirname + '/../../config/config.json')['development'];
function findOne(req, res) {
    // db.users
    //     .findOne({ where: { emailaddress: req.body.email } })
    //     .then(result => res.json(result))

    db.sequelize.query("SELECT u.*,o.name FROM users u inner join organizations o on o.id=u.orgid where emailaddress='" + req.body.email + "'", { type: db.sequelize.QueryTypes.SELECT }).then(user => {
        res.status(200);
        res.json(user);
    })
}
function checkExists(email, callback) {
    db.users
        .findOne({ where: { emailaddress: email } })
        .then(result => callback(result))
}
function getUserById(req, res) {
    db.users.findOne({ where: { id: req.body.id } })
        .then(result => res.json(result));
}
function findAll(req, res) {
    db.users.
        findAll().then(users => { res.json(users) })
}
function createUser(req, res) {
    var JsonData = req.body;
    checkExists(JsonData.email, (result) => {
        if (result == null) {
            insertUser(JsonData, (data) => {
                if (data != null) {
                    res.status(200);
                    res.json(data.get({ plain: true }));
                }
                else {
                    res.status(500);
                    res.json({ error: error, stackError: error.stack });
                }
            })
        }
        else {
            db.users.update({
                emailaddress: JsonData.email,
                firstName: JsonData.firstname,
                lastName: JsonData.lastname,
                orgid: JsonData.orgid,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                    where: { id: result.id },
                    returning: true,
                    plain: true
                }).then((data) => {
                    res.status(200);
                    res.json({ success: "success" });
                }).catch((error) => {
                    console.log(error);
                    res.status(500);
                    res.json({ error: error, stackError: error.stack });
                })
        }
    })


}
function insertUser(JsonData, callback) {
    db.users.create({
        // id: uuidv1(),
        emailaddress: JsonData.email,
        firstName: JsonData.firstname,
        lastName: JsonData.lastname,
        orgid: JsonData.orgid,
        createdAt: new Date(),
        updatedAt: new Date(),
        isemailverify: 0,
        usertype: 'user',
        permission: JsonData.permission
    }).then((data) => {
        callback(data);
    }).catch((error) => {
        console.log(error);
        callback(null);

    })
}
function verifyEmail(req, res) {
    db.users.update({
        isemailverify: 1
    }, {
            where: { emailaddress: req.body.email },
            returning: true,
            plain: true
        }).then((data) => {
            res.status(200);
            res.json({ success: "success" });
        }).catch((error) => {
            console.log(error);
            res.status(500);
            res.json({ error: error, stackError: error.stack });
        })
}
function UpdateUserFromAdmin(req, res) {
    var JsonData = req.body.data;
    db.users.update({
        firstName: JsonData.firstName,
        lastName: JsonData.lastName,
        nowverify: JsonData.nowverify === true ? 1 : 0,
        usertype: JsonData.usertype
    }, {
            where: { id: JsonData.id },
            returning: true,
            plain: true
        }).then((data) => {
            res.status(200);
            res.json({ success: "success" });
        }).catch((error) => {
            console.log(error);
            res.status(500);
            res.json({ error: error, stackError: error.stack });
        })
}
function sendEmailVerification(req, res) {
    var variables;
    var link = config.weburl + 'verifyemail?email=' + req.body.email;
    variables = {
        email: req.body.email,
        emailconfirmlink: link
    }
    var options = {
        recipients: req.body.email,
        template: 'email-verification',
        variables: variables
    }
    console.log(options);
    postageapp.sendMessage(options).then((response) => {
        res.status(200);
        res.json({ success: "success" });
    })
}
function FetchAllUsers(req, res) {
    let fetchcount = parseInt(req.body.fetch);
    //sp_getallusers
    db.sequelize
        .query('CALL sp_getallusers(:FETCHCOUNT)', { replacements: { FETCHCOUNT: fetchcount } })
        .then(result => {
            res.status(200);
            res.json(result);
        });

}
function SearchUserByName(req, res) {
    db.sequelize.query("SELECT id, CONCAT(firstName, ' ',lastName) as title FROM users where firstName like '%" + req.body.name + "%' or lastName like '%" + req.body.name + "%'", { type: db.sequelize.QueryTypes.SELECT }).then(user => {
        res.status(200);
        res.json(user);
    })
}
function LoadUserById(req, res) {
    let id = parseInt(req.body.id);
    //sp_getallusers
    db.sequelize
        .query('CALL sp_getuserbyid(:userid)', { replacements: { userid: id } })
        .then(result => {
            res.status(200);
            res.json(result);
        });
}
function LoadUserByOrgId(req, res) {
    let id = parseInt(req.body.id);
    db.users.
        findAll({
            where: {
                orgid: id
            }
        }).then(users => { res.json(users) })
}
function DeleteUser(req, res) {
    console.log(req.body.id);
    db.users.destroy(
        {
            where: { id: req.body.id }
        }
    ).then((data) => {
        res.status(200);
        res.json({ success: "success" });
    }).catch((error) => {
        res.status(500);
        res.json({ error: error, stackError: error.stack });
    })
}
exports.findOne = findOne;
exports.findAll = findAll;
exports.createUser = createUser;
exports.insertUser = insertUser;
exports.checkExists = checkExists;
exports.verifyEmail = verifyEmail;
exports.sendEmailVerification = sendEmailVerification;
exports.fetchAllUsers = FetchAllUsers;
exports.searchUserByName = SearchUserByName;
exports.loadUserById = LoadUserById;
exports.loadUserByOrgId = LoadUserByOrgId;
exports.getUserById = getUserById;
exports.updateUserFromAdmin = UpdateUserFromAdmin;
exports.deleteUser = DeleteUser;