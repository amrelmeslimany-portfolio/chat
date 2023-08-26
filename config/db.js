const mongoose = require("mongoose");

const DB_URL =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URL
    : process.env.MONGODB_URL_LOCAL;

module.exports = mongoose
  .connect(DB_URL)
  .then((_) => console.log("DB Connect"))
  .catch((error) => console.log("DB Error: ", error));
