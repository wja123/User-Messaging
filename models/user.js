'use strict';

var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

var jwt = require("jwt-simple");

const JWT_SECRET = "Holy Chuck in Toronto makes amazing burgers";

var User;

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String
    },
    image: {
        type: String
    },
    email: {
        type: String
    },
    about: {
        type: String
    }
});

userSchema.statics.register = function(userObj, cb) {
    User.findOne({
        username: userObj.username
    }, function(err, user) {
        if (err || !user) {
            cb(err || "Username taken.");
            return;
        }
    });

    bcrypt.hash(userObj.password, 14, function(err, hash) {
        if (err) {
            return cb(err);
        }
        var newUser = new User();
        newUser.username = userObj.username;
        newUser.password = hash;
        newUser.fullname = userObj.fullname;
        newUser.email = userObj.email;
        newUser.image = userObj.image;
        newUser.save(function(err, savedUser) {
            cb(err);
        });
    });


};

userSchema.statics.authenticate = function(user, cb) {
    User.findOne({
        username: user.username
    }, function(err, userMatch) {
        if (err || !userMatch) {
            return cb("Authentication Failed!");
        }
        bcrypt.compare(user.password, userMatch.password, function(err, successfulMatch) {
            if (err) {
                return cb("Authentication Failed!");
            }

            var payload = {
                userId: userData._id,
                iat: Date.now()
            };

            var token = jwt.encode(payload, JWT_SECRET);
            cb(null, token);
        });

    });
};

// userSchema.statics.update = function(user, cb) {
//     User.findById(user._id, function(err, userMatch) {
//         if (err || !userMatch) {
//             return cb("Authentication Failed!");
//         }
//         bcrypt.compare(user.password, userMatch.password, function(err, successfulMatch) {
//             if (err) {
//                 return cb("Authentication Failed!");
//             }

//             bcrypt.hash(userObj.password, 14, function(err, hash) {
//                 if (err) {
//                     return cb(err);
//                 }
//                 var newUser = new User();
//                 newUser.username = userObj.username;
//                 newUser.password = hash;
//                 newUser.fullname = userObj.fullname;
//                 newUser.email = userObj.email;
//                 newUser.image = userObj.image;
//                 newUser.save(function(err, savedUser) {
//                     cb(err);
//                 });
//             });

//         });

//     });
// };




userSchema.statics.authMiddleware = function(req, res, next) {
    var token = req.cookies.messCookie;

    try {
        var payload = jwt.decode(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).send();
    }

    User.findById(payload._id, function(err, user) {
        if (err || !user) return res.status(401).send();
        req.user = user;
        next();
    });

};

User = mongoose.model('user', userSchema);
module.exports = User;