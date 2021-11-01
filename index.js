const express=require('express');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const cors=require('cors');
const ObjectId= require('mongodb').ObjectId;
const app=express();

const port=process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.duseq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("tour-explorer");
      const tourCollection = database.collection("tourPackage");
      const bookingCollection=database.collection("booking");
      
      console.log('connect to db...');

   
      
      // get api

      app.get('/tourpackages',async(req,res)=>{
        const cursor=tourCollection.find({});
        const result=await cursor.toArray();
        res.send(result);

      });

      // get selected api

      app.get('/tourpackages/:id',async(req,res)=>{
        const id=req.params.id;
        const quary={_id:ObjectId(id)};
        const result=await tourCollection.findOne(quary);
        res.send(result);

      });


      // post api
      app.post('/tourpackages',async(req,res)=>{
       
        const addtourPackage=req.body;
        const result =await tourCollection.insertOne(addtourPackage);
        console.log(`Package Inserted: ${result.insertedId}`);
        res.json(result);

      });

      //delete api

      app.delete('/tourpackages/:id',async(req,res)=>{
        const id=req.params.id;
        const quary={_id:ObjectId(id)};
        const result=await tourCollection.deleteOne(quary);
        console.log(`delete id: ${result.insertedId}`);
        res.json(result);


      });

      //update api
       app.put('/tourpackages/:id',async(req,res)=>{
         const id=req.params.id;
         const updatedPackage=req.body;
         const filter={_id:ObjectId(id)};
         const options = { upsert: true };
         const updateDoc = {
          $set: {
            
            title:updatedPackage.title,
            price:updatedPackage.price,
            location:updatedPackage.location,
             tour_duration:updatedPackage.tour_duration,
             tour_date:updatedPackage.tour_date,
             existing_site:updatedPackage.existing_site,
             package_includes:updatedPackage.package_includes,
             img:updatedPackage.img,
             description:updatedPackage.description,
             important_notes:updatedPackage.important_notes
             
          },
        };
        const result = await tourCollection.updateOne(filter, updateDoc, options);
        res.json(result);

       });


      //  get booking

      app.get('/booking',async(req,res)=>{
        const cursor=bookingCollection.find({});
        const result=await cursor.toArray();
        res.send(result);

      });

      // get selected api

      app.get('/booking/:id',async(req,res)=>{
        const id=req.params.id;
        const quary={_id:ObjectId(id)};
        const result= await bookingCollection.findOne(quary);
        res.send(result);


      });

      //post booking

      app.post('/booking',async(req,res)=>{
        const addToBooking=req.body;
        const result=await bookingCollection.insertOne(addToBooking);
        console.log(`Package Inserted: ${result.insertedId}`)
        res.json(result);

      });

      // booking api delete
      app.delete('/booking/:id',async(req,res)=>{
        const id=req.params.id;
        const quary={_id:ObjectId(id)};
        const result=await bookingCollection.deleteOne(quary);
        res.json(result);

      });


      //update api
      app.put('/booking/:id',async(req,res)=>{
        const id=req.params.id;
        const updatedBooking=req.body;
        const filter={_id:ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = {
         $set: {
           
           name:updatedBooking.neme,
           email:updatedBooking.email,
           age:updatedBooking.age,
           phone:updatedBooking.phone,
           tourpack:updatedBooking.tourpack,
           tourprice:updatedBooking.tourprice,
           date:updatedBooking.date,
           totalprice:updatedBooking.totalprice,
           bookingStatus:updatedBooking.bookingStatus,
            
   
         },
       };
       const result = await bookingCollection.updateOne(filter, updateDoc, options);
       res.json(result);

      });

      app.put('/booking/:id',async(req,res)=>{
        const id=req.params.id;
        const updateStatus=req.body.bookingStatus;
        const filter={_id:ObjectId(id)};
        const options = { upsert: true };
        const updateDoc = {
         $set: {
           bookingStatus:updateStatus,
   
         },
       };
       const result = await bookingCollection.updateOne(filter, updateDoc, options);
       res.json(result);

      });


      

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