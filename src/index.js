const express = require('express');
const userRoutes = require("./routes/category");
require('dotenv').config();

//Settings
const app = express();
const port = process.env.PORT || 9000;
const db = require('./config/database');
db.dbConnection();

//Middleware
app.use(express.json());
app.use('/api', userRoutes);

//Route
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));