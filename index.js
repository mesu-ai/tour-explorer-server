const express=require('express');
require('dotenv').config();
const cors=require('cors');
const app=express();

const port=process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.duseq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("tour-explorer");
      const serviceCollection = database.collection("services");

    
      const query = { name: "Mr Mesu" };
      
      const result = await serviceCollection.insertOne(query);
      
      console.log(result);

    } finally {

    //   await client.close();
    }
  }
  run().catch(console.dir);




app.get('/',(req,res)=>{
    console.log('server stat');
    res.send('server start');
});

app.listen(port,(req,res)=>{
    console.log('connect to server',port);

})