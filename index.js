const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PROXY_PORT || 8080;
const targetServer = process.env.PROXY_TARGET_SERVER;

app.use(express.json());
app.use(cors());

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
app.use("/verify", createProxyMiddleware({ target: `${targetServer}/verify`, changeOrigin: true }));
app.use("/securityQuestions", createProxyMiddleware({ target: `${targetServer}/securityQuestions`, changeOrigin: true }));
app.use("/setsecurityQuestion", createProxyMiddleware({ target: `${targetServer}/setsecurityQuestion`, changeOrigin: true }));
app.use("/userdata", createProxyMiddleware({ target: `${targetServer}/userdata`, changeOrigin: true }));

app.use("/ping", createProxyMiddleware({ target: `${targetServer}/ping`, changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
