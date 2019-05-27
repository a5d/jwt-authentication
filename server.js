'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

MongoClient.connect('mongodb://localhost:27017/animals', function(err, db) {
  if (err) {
    throw err;
  }
  db.collection('mammals').find().toArray(function(err, result) {
    if (err) {
      throw err;
    }
    console.log(result);
  });
});

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get('/api/login', (req, res) => {
  res.send('Login\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
