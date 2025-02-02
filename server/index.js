const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const UserRouter = require("./routes/UserRouter");
const MangeUsersRouter = require("./routes/MangeUsersRouter");
const { ensureAuthenticated, ensureIsAdmin } = require("./middlewares/Auth");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

const openCors = cors({
  origin: (_, callback) => {
    return callback(null, true);
  },
  credentials: true,
});

app.use(openCors);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", ensureAuthenticated, UserRouter);
app.use("/mangeusers", ensureIsAdmin, MangeUsersRouter);

app.listen(PORT, () => {
  console.log(`Authecho SDK server is running on http://localhost:${PORT}`);
});
