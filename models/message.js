'use strict';

var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");

var jwt = require("jwt-simple");

const JWT_SECRET = "Holy Chuck in Toronto makes amazing burgers";

var Message;

var messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId
    },
    message: {
        type: String
    },
    to: {
        type: mongoose.Schema.Types.ObjectId
    },
    sent: {
        type: Date,
        default: Date.now
    }
});


messageSchema.statics.authMiddleware = function(req, res, next) {
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

messageSchema.statics.sendMessage = function(req, cb) {

    var token = req.cookies.messCookie;

    try {
        var payload = jwt.decode(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).send();
    }

    User.findById(payload._id, function(err, user) {
        if (err || !user) return res.status(401).send();

        User.findById(req.params.rec_id, function(err, recUser) {
            if (err || !recUser) return res.status(401).send();
            
            var sendMessage = new Message();
            sendMessage.from = user._id;
            sendMessage.to = recUser._id;
            sendMessage.message = req.params.body.message;
            sendMessage.save(function(err,sentMessage){
                cb(err);
            });

        });
    });


}

Message = mongoose.model('message', messageSchema);
module.exports = Message;