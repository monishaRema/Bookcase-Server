const express = require("express");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const userCollection = client.db("bookCase").collection("user");
    const bookCollection = client.db("bookCase").collection("books");
    const reviewCollection = client.db("bookCase").collection("reviews");

    //  Create user API
    app.post("/user", async (req, res) => {
      const userData = req.body;
      const { email } = userData;
      const existingUser = await userCollection.findOne({ email: email });

      if (!existingUser) {
        const result = await userCollection.insertOne(userData);

        res.json({
          success: true,
          insertedId: result.insertedId,
          message: "New user account created",
        });
      } else {
        res.json({
          success: true,
          message: "User already exists",
        });
      }
    });

    //  Add new book API
    app.post("/book", async (req, res) => {
      const data = req.body;
      const result = await bookCollection.insertOne(data);
      res.send(result);
    });

    // Get Book depending on user email API
    app.get("/book", async (req, res) => {
      console.log(req.query);
      const email = req.query.email;
      const result = await bookCollection.find({ user_email: email }).toArray();
      res.send(result);
    });

    //  Get signle book depending on Book Id
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookCollection.findOne(query);
      res.send(result);
    });

    // delete book API
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookCollection.deleteOne(query);
      res.send(result);
    });

    // upvote API
    app.patch("/upvote/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const query = { $inc: { upvotes: 1 } };
      const result = await bookCollection.updateOne(filter, query);
      res.send(result);
    });

    // get all books API
    app.get("/all-books", async (req, res) => {
      const result = await bookCollection.find().toArray();
      res.send(result);
    });

    // get all books API Depending on User
    app.get("/user/books", async (req, res) => {
      const email = req.query.email;
      console.log(email)
      const result = await bookCollection.find({user_email: email}).toArray();
      res.send(result);
    });

    

    // update books API
    app.put("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedBook = req.body;
      const updatedBookData = {
        $set: updatedBook,
      };
      const result = await bookCollection.updateOne(filter, updatedBookData);
      res.send(result);
    });

    // Get Popular Book API
    app.get("/popular-books/", async (req, res) => {
      const result = await bookCollection
        .find()
        .sort({ upvotes: -1 })
        .limit(8)
        .toArray();
      res.send(result);
    });

    // Get recent Book API
    app.get("/recent-books/", async (req, res) => {
      const result = await bookCollection
        .find()
        .sort({ _id: -1 })
        .limit(8)
        .toArray();
      res.send(result);
    });
    // Post a Review API
    app.post("/review", async (req, res) => {
      const data = req.body;

      const { book_id, user_email } = req.body;
      const existingReview = await reviewCollection.findOne({
        book_id,
        user_email,
      });

      if (existingReview) {
        return res.json({
          status: "400",
          message: "You have already reviewed this book.",
        });
      }
      const result = await reviewCollection.insertOne(data);
      res.send(result);
    });
    // Get Review API
    app.get("/review/:id", async (req, res) => {
      const id = req.params.id;
      const result = await reviewCollection.find({ book_id: id }).toArray();
      res.send(result);
    });

    // delete review API
    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    // update review API
    app.patch("/review/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const query = { $set: { review_text: req.body.review } };
      const result = await reviewCollection.updateOne(filter, query);
      res.send(result);
    });

    // Aggregate Category from all books api
    app.get("/book-category/", async (req, res) => {
      const result = await bookCollection.aggregate([
        {
          $group:{
            _id:"$book_category",
            count:{$sum:1}
          }
        },
        {
          $project:{
            _id:0,
            book_category:"$_id",
            count:1
          }
        }


      ]).toArray()

      res.send(result);
    });


     // Aggregate Category from all books api depending of user
    app.get("/user/category/", async (req, res) => {
      const email = req.query.email;
      const result = await bookCollection.aggregate([
        {
          $match: {user_email: email}
        },
        {
          $group:{
            _id:"$book_category",
            count:{$sum:1}
          }
        },
        {
          $project:{
            _id:0,
            book_category:"$_id",
            count:1
          }
        }


      ]).toArray()
      console.log(result)
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Server is running");
});
app.listen(port);
