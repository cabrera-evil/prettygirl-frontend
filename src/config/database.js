const mongoose = require("mongoose");

const dbConnection = async () => {
    mongoose
        .connect(process.env.MONGODB_CNN)
        .then(() => { console.log("Connected to MongoDB Atlas") })
        .catch((err) => { console.log(err) });
};

module.exports = { dbConnection };