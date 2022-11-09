const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const uri = `mongodb+srv://${process.env.SECRET_USER}:${process.env.SECRET_KEY}@cluster0.4gwnm.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());

// ElNoRHp6kts9aOvS
//deliveryService

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  const serviceCollection = client.db("deliveryService").collection("services");
  const reviewCollection = client
    .db("deliveryService")
    .collection("userReview");
  try {
    app.get("/", (req, res) => {
      res.send("server is running");
    });
    // limit service section api
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query).sort({ rating: -1 });
      const user = await cursor.limit(3).toArray();
      res.send(user);
    });
    // all service section api
    app.get("/allService", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query).sort({ rating: -1 });
      const user = await cursor.toArray();
      res.send(user);
    });
    // find one service
    app.get("/allService/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await serviceCollection.findOne(query);

      res.send(result);
    });
    // review get api
    app.get("/review", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // review post api
    app.post("/review", async (req, res) => {
      const user = req.body;
      const result = await reviewCollection.insertOne(user);
      res.send(result);
    });
    // review delete api
    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deleteOk = await reviewCollection.deleteOne(query);
      res.send(deleteOk);
    });
    // review find single data api
    app.get("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.findOne(query);
      res.send(result);
    });
    // review update put method
    app.put("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      const updateUser = {
        $set: {
          reviewer: user.name,
        },
      };
      const result = await reviewCollection.updateOne(
        query,
        updateUser,
        option
      );
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`server is running${port}`);
});
