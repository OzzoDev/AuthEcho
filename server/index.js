const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes/AuthRouter");
const AccountRouter = require("./routes/AccountRouter");
const ConnectRouter = require("./routes/ConnectRouter");
const AppRouter = require("./routes/AppRouter");
const cookieParser = require("cookie-parser");
const { ensureAuthenticated, ensureApiKey, verifyAppCredentials } = require("./middlewares/Auth");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

const restrictedCors = cors({
  origin: "http://localhost:3001",
  credentials: true,
  exposedHeaders: ["authehco-master-api-key"],
});

const openCors = cors({
  origin: (_, callback) => {
    return callback(null, true);
  },
  credentials: true,
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/auth", restrictedCors, ensureApiKey, AuthRouter);
app.use("/account", restrictedCors, ensureAuthenticated, AccountRouter);
app.use("/connect", restrictedCors, ensureApiKey, ensureAuthenticated, ConnectRouter);
app.use("/app", openCors, verifyAppCredentials, AppRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
