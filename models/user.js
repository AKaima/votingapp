const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const Schema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', Schema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};
module.exports.getUserByUsername = function(username, callback){
    User.findOne({username: username}, callback);
};
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err)
                throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(pass, hash, callback){
    bcrypt.compare(pass, hash, (err, isValid) => {
        if(err)
            throw err;
        callback(null, isValid);
    });
};