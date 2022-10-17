const express = require("express");
require("dotenv").config();

const { dbConnection } = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Connect to database
        this.connectDB();
    }

    connectDB() {
        dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port", this.port);
        });
    }
}

module.exports = Server;
