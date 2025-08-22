const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

try {
  mongoose.connect(MONGODB_URI).then(() => {
    console.log("DB CONECTADA");
  });
} catch (e) {
  console.log(e);
}

module.exports = mongoose;
