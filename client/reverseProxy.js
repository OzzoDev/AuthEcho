const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const TARGET_SERVER = process.env.TARGET_SERVER;

app.use(express.static(path.join(__dirname, "public")));

const reverseProxy = createProxyMiddleware({
  target: TARGET_SERVER,
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
  onProxyReq: (proxyReq, req, res) => {
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
      proxyReq.setHeader("Cookie", cookieHeader);
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    const setCookieHeaders = proxyRes.headers["set-cookie"];
    if (setCookieHeaders) {
      if (Array.isArray(setCookieHeaders)) {
        setCookieHeaders.forEach((cookie) => {
          res.setHeader("Set-Cookie", cookie);
        });
      } else {
        res.setHeader("Set-Cookie", setCookieHeaders);
      }
    }
  },
});

app.use("/api", reverseProxy);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); //Template for serving pages for SPA apps
});

app.listen(PORT, () => {
  console.log(`Reverse proxy server is running on http://localhost:${PORT}`);
});
