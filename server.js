const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const Log = require('./models/log');
const seeds = require('./models/seeds');
const dayjs = require('dayjs');

// How to connect to the database either via heroku or locally
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/captainslog';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// SEEDS
app.get('/logs/seed', (rea, res) => {
  Log.create(seeds, (err, logs) => {
    if (err) res.send(err);
    res.redirect('/logs');
  });
});

// INDEX
app.get('/logs', (req, res) => {
  Log.find({}, (err, logs) => {
    if (err) res.send(err);
    res.render('index.ejs', { logs });
  });
});

// NEW
app.get('/logs/new', (req, res) => {
  res.render('new.ejs');
});

// SHOW
app.get('/logs/:id', (req, res) => {
  Log.findById(req.params.id, (err, log) => {
    let now = dayjs();
    if (err) res.send(err);
    res.render('show.ejs', { log, now });
  });
});

// CREATE
app.post('/logs', (req, res) => {
  req.body.shipIsBroken = req.body.shipIsBroken === 'on' ? true : false;
  Log.create(req.body, (err, log) => {
    if (err) res.send(err);
    res.redirect('/logs');
  });
});

app.listen(PORT, () => {
  console.log(`nodemon running on ${PORT}`);
});
