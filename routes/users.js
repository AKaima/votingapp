const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jsonwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({
                success: false,
                msg: "Registration Failed"
            });
        }
        else
        {
            res.json({
                success: true,
                msg: "Registration Success"
            });
        }
    });
});

router.post('/auth', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err)
            throw err;
        if(!user)
            return res.json({
                success: false,
                msg: "User not found"
            });
        User.comparePassword(password, user.password, (err, isValid) => {
            if(err)
                throw err;
            if(isValid){
                const token = jsonwt.sign(user, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: "JWT " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }
            else
            {
                return res.json({
                    sucess: false,
                    msg: "Invalid Password"
                });
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({
        user:  req.user
    });
});

module.exports = router;