const express = require('express');
require('dotenv').config();

//Settings
const app = express();
const port = process.env.PORT || 9000;

//Database
const db = require('./config/database');
db.connect();

//Cloudinary
const cloudinary = require('./config/cloudinary');
cloudinary.config();

//Middleware
const middleware = require('./middlewares/index');
middleware.config(app);

//Route
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));