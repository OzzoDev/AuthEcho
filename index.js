const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/AuthRouter");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/auth", AuthRouter);

app.get("/ping", (_, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
