const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cookieParser = require('cookie-parser')
var cors = require('cors')
const port = 3500
const auth = require('./routes/auth');
const story = require('./routes/story');

// Middleware
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
dotenv.config();

app.use(cors())
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connection established to MongoDB");
}).catch((err) => {
    console.log("error connecting to MongoDB", err);
});

const PORT = process.env.PORT || port;
const HOST = process.env.HOST || "localhost";


app.get('/', (req, res) => {
  res.send('Hello World! cricket')
})

app.use(express.json());

app.use('/api/v1/auth', auth);
app.use('/api/v1/story', story);

app.use('/*', (req, res) => {
    res.status(404).json({message: "Route not found"});
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port https://${HOST}:${PORT}`); 
})