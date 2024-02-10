const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hgznyse.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

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

        // const usersCollection = client.db("parlourDB").collection('users');
        const servicesCollection = client.db("parlourDB").collection('services');

        // post method for user
        // app.post('/users', async (req, res) => {
        //     const user = req.body;
        //     const query = { email: user.email }
        //     const existingUser = await usersCollection.findOne(query);
        //     if (existingUser) {
        //         return res.send({ message: 'user already exist', insertedId: null })
        //     }
        //     const result = await usersCollection.insertOne(user);
        //     res.send(result)
        // })

        // get method for menu
        app.get('/services', async (req, res) => {
            const result = await servicesCollection.find().toArray();
            res.send(result)
        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Parlour server is ready !')
})

app.listen(port, () => {
    console.log(`Parlour server is running on port ${port}`)
})