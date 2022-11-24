const mongoose = require("mongoose");
const {config} = require('../config/cloudinary');

const connect = async () => {
    mongoose
        .connect(process.env.MONGODB_CNN)
        .then(() => { 
            console.log("Connected to MongoDB Atlas") 
            config();
        })
        .catch((err) => { console.log(err) });
};

module.exports = { connect };