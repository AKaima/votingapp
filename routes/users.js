const express = require('express');
const router = express.Router();

router.get('/register', (req, res, next) => {
    res.send("Register");
});

router.get('/auth', (req, res, next) => {
    res.send("Auth");
});

router.get('/dashboard', (req, res, next) => {
    res.send("Dashboard");
});

module.exports = router;