var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}).select("-password").exec(function(err, users) {
        res.status(err ? 400 : 200).send(err || users);
    });
});

router.post("/register", function(req, res, next) {
    User.register(req.body, function(err) {
        res.status(err ? 400 : 200).send(err);
    });
});

router.post("/authenticate", User.authMiddleware, function(req, res) {
    User.authenticate(req.body, function(err, token) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.cookie("messCookie", token).send();
        }
    });
});

router.post("/profile", User.authMiddleware, function(req, res) {
    res.send(req.user);
});

// router.put("/update",function(req,res){
//     User.update(req.body, function(err, token) {
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             res.cookie("messCookie", token).send();
//         }
//     });
// });

module.exports = router;