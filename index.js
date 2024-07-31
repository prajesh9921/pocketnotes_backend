const express = require('express')
const mongoose = require('mongoose');
const app = express()
var cors = require('cors')
const port = 3500
const group = require('./routes/group');

// Middleware
const dotenv = require('dotenv');
dotenv.config();

app.use(cors())

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connection established to MongoDB");
}).catch((err) => {
    console.log("error connecting to MongoDB", err);
});

const PORT = process.env.PORT || port;
const HOST = process.env.HOST || "localhost";


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use('/api/v1/group', group);

app.use('/*', (req, res) => {
    res.status(404).json({message: "Route not found"});
})

app.listen(PORT, () => {
    console.log(`Server listening on port https://${HOST}:${PORT}`); 
})