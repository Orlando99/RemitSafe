const db = require("../models");

module.exports = {
    logThis: function (req, res) {
        res.json("From controller");
    },
    findOne: function (req, res) {
        db.users
            .findOne({ where: {email: req.body} })
            .then(result => res.json(result))
    }
    
};



