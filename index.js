const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PROXY_PORT || 8080;
const targetServer = process.env.PROXY_TARGET_SERVER || "http://localhost:3000";

app.use(express.json());
app.use(cors());

console.log(`Proxy target server: ${targetServer}`);

app.use((req, res, next) => {
  console.log(`Proxy received request for: ${req.url}`);
  next();
});

app.use("/signin", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/signup", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/updateemail", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/updateusername", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/sendverificationcode", createProxyMiddleware({ target: targetServer, changeOrigin: true }));
app.use("/resetpassword", createProxyMiddleware({ target: targetServer, changeOrigin: true }));

app.use(
  "/ping",
  createProxyMiddleware({
    target: targetServer,
    changeOrigin: true,
    logLevel: "debug",
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy error");
    },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
