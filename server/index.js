const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/AuthRouter");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_ORIGIN = process.env.APP_ORIGIN;

const corsOptions = {
  origin: [CLIENT_ORIGIN, "http://localhost:3001"],
  // origin: "http://localhost:3001",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionSuccessStatus: 204,
  credentials: true,
};

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   preflightContinue: false,
//   optionSuccessStatus: 204,
//   credentials: true,
// };

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/auth", AuthRouter);

app.get("/ping", (_, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
