const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
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
  try {
    app.get("/", (req, res) => {
      res.send("server is running");
    });
    // limit service section api
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const user = await cursor.limit(3).toArray();
      res.send(user);
    });
    // all service section api
    app.get("/allService", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`server is running${port}`);
});
