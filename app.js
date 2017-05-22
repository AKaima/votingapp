const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log("Connected to database " + config.database);
});
mongoose.connection.on('errror', (err) => {
    console.log(err);
});

const app = express();

const users = require('./routes/users');
const polls = require('./routes/polls');

const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/users', users);
app.use('/polls', polls);

app.get('/', (req, res) => {
    res.send('Invalid');
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});