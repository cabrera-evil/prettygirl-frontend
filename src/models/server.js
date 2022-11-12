const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { connect } = require("../config/database");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);

    this.paths = {
      auth: "/api/auth",
      search: "/api/search",
      uploads: "/api/uploads",
      categories: "/api/categories",
      products: "/api/products",
      booking: "/api/booking",
      users: "/api/users",
    };

    // Connect to database
    this.connectToDatabase();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Body Parser
    this.app.use(express.json());

    // Public folder
    this.app.use(express.static("public"));

    // File Upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  async connectToDatabase() {
    await connect();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.booking, require("../routes/booking"));
    this.app.use(this.paths.users, require("../routes/users"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

module.exports = Server;
