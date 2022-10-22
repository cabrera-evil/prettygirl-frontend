const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const userRoutes = require("./routes/category");

const app = express();
const port = process.env.PORT || 9001;

//Middleware
app.use(express.json());
app.use('/api', userRoutes);

//Route
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

//Mongodb Connection
mongoose
    .connect(process.env.MONGODB_CNN)
    .then(() => { console.log("Connected to MongoDB Atlas") })
    .catch((err) => { console.log(err) });

app.listen(port, () => console.log(`Server listening on port ${port}`));