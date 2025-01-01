const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/AuthRouter");

require("dotenv").config();
require("./modules/db");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", AuthRouter);

app.get("/ping", (_, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
