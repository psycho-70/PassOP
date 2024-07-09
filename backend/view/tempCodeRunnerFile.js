const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require("dotenv")

// database connetion url
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myProject';

// dotenv file
dotenv.config()
// console.log(process.env.MONG_URL)

// express app live on server
const app = express()
const port = 3000

 client.connect();

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const findResult = await collection.find({}).toArray();
console.log('Found documents =>', findResult);
  res.send('Hello World!')
  res.json(findResult)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})