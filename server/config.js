const express = require("express");
const path = require("path");
const cors = require("cors");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // middlewares
    this.app.use(express.json());

    // cors
    this.app.use(cors());

    // static files
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  routes() {
    this.app.use('/api/productos', require('../routes/productos.routes'))
    this.app.use('/api/usuarios', require('../routes/usuarios.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;