const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGODB_CONNECT).then(() => {
    console.log("DB CONECTADA");
  });
} catch (e) {
  console.log(e);
}

module.exports = mongoose;
