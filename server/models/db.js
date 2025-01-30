const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_CONNECT;

if (mongoUrl) {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Mongodb connect");
    })
    .catch((err) => {
      console.log("Mongodb connection error: ", err);
    });
} else {
  console.log(
    "Please include the MongoDB URI in the server/.env file to commence database operations."
  );
}
