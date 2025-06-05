const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


const client = new MongoClient( process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
       const userCollection = client.db("bookCase").collection("user");
       const bookCollection = client.db("bookCase").collection("books");
       const reviewCollection = client.db("bookCase").collection("reviews");

      //  Create user API 

       app.post('/user',async(req,res)=>{
          const userData = req.body
          const {email} = userData
      
          const existingUser = await userCollection.findOne({email:email})
       
          if(!existingUser){
            const result = await userCollection.insertOne(userData)
    
            res.json({
              success:true,
              insertedId:result.insertedId,
              message:'New user account created'
            })
          }else{
            res.json({
              success:true,
              message:'User already exists'
  
            })
          }
          
       })

      //  Add new book API
      app.post('/book', async (req, res) => {
        const data = req.body
        const result = await bookCollection.insertOne(data)
        console.log(result)
        res.send(result);
      })

      // Get Book depending on user email API

      app.get('/book', async (req, res) => {
        console.log(req.query)
          const email = req.query.email
          const result = await bookCollection.find({user_email: email}).toArray();
          res.send(result)
      })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
   
   
  }
}
run().catch(console.dir);

app.get( '/', async (req, res)=> {
  res.send('Server is running')
})
app.listen(port)
