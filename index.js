const express=require('express');
const app = express();
const port=process.env.PORT||3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/registers', async (req, res) => {
  // findOne
  let result = await client.db('registers').collection('users').findOne({
    username: req.body.username,
    password: req.body.password,
    password_again: req.body.password_again,


  })
  res.send(result)
})

app.post('/users', async (req, res) => {
  // console.log(req.body)

  let result = await client.db('registers').collection('users').insertOne(
    {
      username: req.body.username,
      password: req.body.password,
      password_again:req.body.password_again,

    }
  )
  res.send(result)
})
app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://brian_nogizaka:nogizakabrian@cluster2.pwcr3rq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2";// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);
