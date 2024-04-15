const express=require('express');
const app = express();
const port=process.env.PORT||3000;



app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));


app.get('/',  (req, res) => {
  res.sendFile(__dirname + 'public/index.html');

})

app.post('/registers',  async(req, res) => {
 
  let result = await client.db('registerss').collection('userss').insertOne(//
    {
      username: req.body.username,
      password: req.body.password,
      password_again:req.body.password_again,

    }
  )
  res.sendFile(__dirname + '/public/thanks.html');
  console.log(result);
  console.log(req.body);



  
})
/*app.post('/users', async (req, res) => {
  // console.log(req.body)

  let result = await client.db('registers').collection('users').insertOne(
    {
      username: req.body.username,
      password: req.body.password,
      password_again:req.body.password_again,

    }
  )
  res.send(result)
})*/
app.post('/login', async (req, res) => {
  // Get the username and password from the request body
 
  const { username, password, } = req.body;

  // Find the user in the database
  let user = await client.db('registerss').collection('userss').findOne(
    { username,password });

  // If the user doesn't exist or the password is incorrect, send an error response
  if (!user || user.password !== password) {
   // res.send.('Login failed. Please try again.')
    res.sendFile(__dirname + '/public/login.html');
    
    return;
  }
  else
  // If the username and password are correct, send a success response
  res.send('Login successful');
});
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
