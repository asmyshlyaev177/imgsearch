const express = require('express');
const app = express();
const scrapper = require('puppeteer');
const mongodb = require('mongodb').MongoClient;
const dbUri = 'mongodb://127.0.0.1:27017/imgsearch';
const url = require('url');
const cheerio = require('cheerio');
var mongo;
var browser;
var page;

mongodb.connect(dbUri, (err, db) => {
  if (err) console.log(err);
  mongo = db;
});

app.get('/latest', (req, res) => {
  res.send('LATEST QUERIES');
});

app.get('/:query', (req, res) => {
  if (req.url === '/favicon.ico') { return res.end() };

  var query = decodeURI(req.path.replace(/^\//, ''));
  var offset = req.query.offset;
  res.json({'search query': query, 'Offset': offset});
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(err.message);
});

app.listen(3000);
