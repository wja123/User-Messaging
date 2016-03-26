var express = require('express');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/messages', User.authMiddleware, function(req, res, next) {
  console.log("req.user",req.user);
  res.send("Access Granted!");

});

module.exports = router;
