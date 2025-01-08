const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PROXY_PORT || 8080;
const targetServer = process.env.PROXY_TARGET_SERVER;

app.use(express.json());
app.use(cors());

app.use("/signin", createProxyMiddleware({ target: `${targetServer}/signin`, changeOrigin: true }));
app.use("/signup", createProxyMiddleware({ target: `${targetServer}/signup`, changeOrigin: true }));
app.use("/updateemail", createProxyMiddleware({ target: `${targetServer}/updateemail`, changeOrigin: true }));
app.use("/updateusername", createProxyMiddleware({ target: `${targetServer}/updateusername`, changeOrigin: true }));
app.use("/sendverificationcode", createProxyMiddleware({ target: `${targetServer}/sendverificationcode`, changeOrigin: true }));
app.use("/resetpassword", createProxyMiddleware({ target: `${targetServer}/resetpassword`, changeOrigin: true }));

app.use("/ping", createProxyMiddleware({ target: `${targetServer}/ping`, changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
