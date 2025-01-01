const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./modules/db");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get("/ping", (_, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
