var express = require('express');
var router = express.Router();
var User = require("../models/user");
var Messages = require("../models/message");

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}).select("username").exec(function(err, users) {
        res.status(err ? 400 : 200).send(err || users);
    });
});

router.post("/send/:rec_id", function(req, res, next) {
    Message.message(req, function(err) {
        res.status(err ? 400 : 200).send(err);
    });
});


module.exports = router;