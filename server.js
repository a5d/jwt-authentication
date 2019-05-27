'use strict';

const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

const mongoClient = new MongoClient("mongodb://mongodb:27017/", { useNewUrlParser: true });

mongoClient.connect(function(err, client){
  if(err) return console.log(err);
  app.locals.collection = client.db("usersdb").collection("users");
});

// App
const app = express();
app.get('/', (req, res) => {
  const user = {name: 123, age: 345};

  const collection = req.app.locals.collection;
  collection.insertOne(user, function(err, result){

    if(err) return console.log(err);
    res.send(user);
  });


  res.send('Hello world\n');

});

app.get('/api/login', (req, res) => {
  res.send('Login\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
