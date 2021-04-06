const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/nzesportes'));
app.use(express.static(path.join(__dirname + 'node_modules')));

app.use(bodyParser.json()); // support json encoded bodies

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/nzesportes/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.filter = 404;
  next(err);
});

// HTTP listener
const PORT = process.env.PORT || 3030;
app.listen(PORT, function () {
  console.log('Nzesportes running on port ' + PORT);
});

module.exports = app;
