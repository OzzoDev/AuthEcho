const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/AuthRouter");
const cookieParser = require("cookie-parser");
const { hex128BitKey } = require("./utils/crypto");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;
const AUTHECHO_MASTER_API_KEY = process.env.AUTHECHO_MASTER_API_KEY;

const corsOptions = {
  origin: (_, callback) => {
    return callback(null, true);
  },
  credentials: true,
  exposedHeaders: ["authehco-master-api-key"],
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

const ensureApiKey = (req, res, next) => {
  const apiKey = req.headers["authehco-master-api-key"];

  if (apiKey !== AUTHECHO_MASTER_API_KEY) {
    return res.status(403).json({ message: "Master Api key is wrong or missing", success: false });
  }

  next();
};

app.use("/auth", ensureApiKey, AuthRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
