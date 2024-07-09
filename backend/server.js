const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors')
// const { ObjectId } = require('mongodb');

// database connetion url
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassOP';
// app.use(express.json());
client.connect();
// dotenv file
dotenv.config()
// console.log(process.env.MONG_URL)

// express app live on server
const app = express()
const port = 3000

// bodyparser middleware
app.use(bodyParser.json())
app.use(cors())


// get the data 
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('SavePassword');
  const findResult = await collection.find({}).toArray();

  // res.send('Hello World!')
  res.json(findResult)
})

// save the data using post 
app.post('/', async (req, res) => {
  const password= req.body
  const db = client.db(dbName);
  const collection = db.collection('SavePassword');
  const findResult = await collection.insertOne(password)
  res.send({success:true , result:findResult})
  
})
// save the data using post 
app.delete('/', async (req, res) => {
  const password= req.body
  const db = client.db(dbName);
  const collection = db.collection('SavePassword');
  const findResult = await collection.deleteOne(password)
  res.send({success:true})
  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})