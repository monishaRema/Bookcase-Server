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

  
       app.post('/user',async(req,res)=>{
          const userData = req.body
          const {email} = userData
          console.log(email)
          const existingUser = await userCollection.findOne({email:email})
          console.log(existingUser)
          if(!existingUser){
            const result = await userCollection.insertOne(userData)
            console.log(result)
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
