const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_CONNECT;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Mongodb connect");
  })
  .catch((err) => {
    console.log("Mongodb connection error: ", err);
  });
