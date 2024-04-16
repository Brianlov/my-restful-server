const express=require('express');
const app = express();
const bcrypt=require('bcrypt');
const port=process.env.PORT||3000;



app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));


app.get('/',  (req, res) => {
  res.sendFile(__dirname + 'public/index.html');

})

app.post('/registers',  async(req, res) => {

  let NotNew = await client.db("registers").collection("users").findOne({ username: req.body.username });
  if (NotNew) {
    res.sendFile(__dirname + '/public/register.html');
    console.log("Username already exists");
  }
  else {
    const hash = bcrypt.hashSync(req.body.password, 10);
    //insertOne()=insert a single document into a collection
    let result = await client.db("registers").collection("users").insertOne(
      {
        username: req.body.username,
        email: req.body.email,
        password: hash

      })

  res.sendFile(__dirname + '/public/thanks.html');
  console.log(result);
  console.log(req.body);
}



  
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
  let user = await client.db("registers").collection("users").findOne({ username: req.body.username });
  // If the user doesn't exist or the password is incorrect, send an error response
  if (!req.body.username || !req.body.password) {
   // res.send.('Login failed. Please try again.')
    res.sendFile(__dirname + '/public/login.html');
    
    return;
  }
  else if (req.body.username != null && req.body.password != null) {

    //step 2
    let user = await client.db("registers").collection("users").findOne({ username: req.body.username });
    if (user)//step 3
    {
      //user found,check whether password is correct
      console.log(user);//found in database
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //password is correct
        res.status(200).send({
          message: "Welcome " + user.username,
          username: user.username,
          password: user.password,
        });
      } // true
      else {
        res.sendFile(__dirname + '/public/login.html');
        console.log("Password is incorrect");
        //password is incorrect
      }//false
    }
    else { //user not found
      res.sendFile(__dirname + '/public/login.html');
      console.log("User not found");
    }
  }
});
app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`);
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://brian_nogizaka:20010808@cluster2.pwcr3rq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2";// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
