const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");
const { MongoClient, ServerApiVersion } = require('mongodb'); // MongoClient lets us connect to our database
const cors = require('cors');

/* INITIALIZE DATABASE */
const URI = "mongodb+srv://daniel:week6@week6-cluster.wypbi.mongodb.net/?retryWrites=true&w=majority&appName=week6-cluster"; // how we identify our database
const DB = "week6-cluster";
const CONNECTION_TIMEOUT = 5000;

const client = new MongoClient(URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        console.log("Connecting to MongoDB...");
        const connectPromise = client.connect(); // Create promise for connection
        const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('MongoDB connection timeout')), CONNECTION_TIMEOUT));
        await Promise.race([connectPromise, timeoutPromise]);

        await client.db(DB).command({ ping: 1 });
        console.log("Successfully connected!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}
connectToDatabase();

/* INITIALIZE SERVER */
const app = express();
const route = express.Router();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json()); // to parse the JSON in requests 
app.use(bodyParser.urlencoded({ extended: false })); // to parse URLs
app.use('/v1', route); // add the routes we make

app.listen(port, () => {    
  console.log(`Server listening on port ${port}`);
});


/* ACCESS DATABASE */
async function insertUser (newUser) {
    try {
        const usersCollection = client.db(DB).collection("users");
        const result = await usersCollection.insertOne(newUser);

        return await usersCollection.findOne({ _id: result.insertedId });
    } catch (error) {
        console.error("Error inserting user into the database:", error);
        throw error;
    }
};

async function getAllUsers () {
    // get user collection and find all users
    const usersCollection = client.db(DB).collection("users");
    return await usersCollection.find().toArray();
};

async function getUser (name) {
    // get user collection and find users that match name
    const usersCollection = client.db(DB).collection("users");
    return await usersCollection.find({ name: name }).toArray();
};

/* WEEK 4: DATABASE ROUTES */
route.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        if (!newUser || Object.keys(newUser).length === 0) {
            return res.status(400).json({ error: "Invalid user data" });
        }

        const createdUser = await insertUser(newUser);
        console.log("Inserted new user:", createdUser);
        res.status(201).json(createdUser);
    } catch (error) {
        console.error("Failed to create a new user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

route.get('/users/:name?', async (req, res) => {
    try {
        const name = req.params.name;
        let users;

        if (name) {
            users = await getUser(name);
        }
        else {
            users = await getAllUsers(); // get users
        }
    
        console.log("Fetched users:", users);
        res.status(200).json(users);
    } catch (error) {
        console.error("Failed to fetch all users:", error);
        res.status(500).json({ error: message });
    }
});


/* OLD ROUTES */
// static GET
route.get('/simple-get', (req, res) => {
  res.send("here");
});

// dynamic GET (response is based on data in request)
route.get('/dynamic-get/:text', (req, res) => {
  res.send(req.params.text);
});

// external API
route.get('/pokemon/:name', async (req, res) => {
  const pokemonName = req.params.name.toLowerCase(); // we extract data from the request

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    // store data from the API response
    const pokemonData = {
      name: response.data.name,
      id: response.data.id,
      height: response.data.height,
      weight: response.data.weight,
    };

    res.json(pokemonData);
  } catch (error) {
    res.status(404).send({ error: "Pokémon not found!" });
  }
});