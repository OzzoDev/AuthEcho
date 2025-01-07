const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const targetServer = process.env.TARGET_SERVER;

app.use(express.json());
app.use(cors());

app.use("/signin", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/signup", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/updateemail", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/updateusername", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/sendverificationcode", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/resetpassword", createProxyMiddleware({ target: targetServer, changeOrigin: true }));

app.get("/ping", (_, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
