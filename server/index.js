const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/AuthRouter");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: (origin, callback) => {
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
