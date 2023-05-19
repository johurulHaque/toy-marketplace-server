const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());


const toys = require("./data/toy.json");
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)

// app.get("/toys", (req, res) => {
//   res.send(toys);
// });

// app.get('/toy/:id', (req, res) => {
//     const id = req.params.id; 
//     const selectedToy = toys.find(n => n.id == id);
//     res.send(selectedToy)
//   })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w9tsbcy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("toyHome").collection("toys");


    app.get("/toys", async(req, res) => {
      const result = await database.find().toArray();
      res.send(result);
    });

    app.get('/toy/:id', async (req, res) => {
      const id = req.params.id; 
      const query = { _id: new ObjectId(id) };
      const result = await database.findOne(query);
      res.send(result);
      
      // const selectedToy = toys.find(n => n.id == id);
      // res.send(selectedToy)
    })
    


    app.post('/add-toy',async(req, res)=>{
      const body = req.body;
      const result = await database.insertOne(body);
      res.send(result);
    })



    // const result = await database.insertOne(doc);

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

