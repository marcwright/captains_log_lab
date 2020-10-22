const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/captainslog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.use(express.urlencoded({ extended: false }));

app.get('/logs/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/logs', (req, res) => {
  req.body.shipIsBroken = req.body.shipIsBroken === 'on' ? true : false;
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`nodemon running on ${PORT}`);
});
