const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PROXY_PORT || 8080;
const targetServer = process.env.PROXY_TARGET_SERVER;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/verifyauthentication", createProxyMiddleware({ target: `${targetServer}/verifyauthentication`, changeOrigin: true }));
app.use("/signup", createProxyMiddleware({ target: `${targetServer}/signup`, changeOrigin: true }));
app.use("/verifyaccount", createProxyMiddleware({ target: `${targetServer}/verifyaccount`, changeOrigin: true }));
app.use("/signin", createProxyMiddleware({ target: `${targetServer}/signin`, changeOrigin: true }));
app.use("/updateemail", createProxyMiddleware({ target: `${targetServer}/updateemail`, changeOrigin: true }));
app.use("/updateusername", createProxyMiddleware({ target: `${targetServer}/updateusername`, changeOrigin: true }));
app.use("/sendverificationcode", createProxyMiddleware({ target: `${targetServer}/sendverificationcode`, changeOrigin: true }));
app.use("/validateemail", createProxyMiddleware({ target: `${targetServer}/validateemail`, changeOrigin: true }));
app.use("/validatepassword", createProxyMiddleware({ target: `${targetServer}/validatepassword`, changeOrigin: true }));
app.use("/resetpassword", createProxyMiddleware({ target: `${targetServer}/resetpassword`, changeOrigin: true }));
app.use("/updatepassword", createProxyMiddleware({ target: `${targetServer}/updatepassword`, changeOrigin: true }));
app.use("/unlockaccount", createProxyMiddleware({ target: `${targetServer}/unlockaccount`, changeOrigin: true }));
app.use("/issuspended", createProxyMiddleware({ target: `${targetServer}/issuspended`, changeOrigin: true }));
app.use("/userdata", createProxyMiddleware({ target: `${targetServer}/userdata`, changeOrigin: true }));
app.use("/securityquestions", createProxyMiddleware({ target: `${targetServer}/securityQuestions`, changeOrigin: true }));
app.use("/setsecurityquestion", createProxyMiddleware({ target: `${targetServer}/setsecurityQuestion`, changeOrigin: true }));
app.use("/getusersecurityquestion", createProxyMiddleware({ target: `${targetServer}/getusersecurityquestion`, changeOrigin: true }));
app.use("/validatesecurityquestion", createProxyMiddleware({ target: `${targetServer}/validatesecurityquestion`, changeOrigin: true }));
app.use("/clearcookies", createProxyMiddleware({ target: `${targetServer}/clearcookies`, changeOrigin: true }));

app.use("/ping", createProxyMiddleware({ target: `${targetServer}/ping`, changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
