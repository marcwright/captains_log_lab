const express = require('express');
const app = express();
const PORT = 3000;
const methodOverride = require('method-override');

app.get('/logs/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(PORT, () => {
  console.log(`nodemon running on ${PORT}`);
});
