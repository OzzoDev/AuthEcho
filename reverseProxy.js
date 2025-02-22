const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || "development";
const TARGET_SERVER = process.env.TARGET_SERVER || "http://localhost:3000";
const REACT_DEV_SERVER = "http://localhost:5173";
const AUTHECHO_MASTER_API_KEY = process.env.AUTHECHO_MASTER_API_KEY;

app.use("/api", (req, _, next) => {
  req.headers["authehco-master-api-key"] = AUTHECHO_MASTER_API_KEY;
  next();
});

app.use(
  "/api",
  createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    pathRewrite: (_, req) => {
      return req.originalUrl.replace(/^\/api/, "");
    },
    logLevel: "debug",
    onProxyReq: (proxyReq, req) => {
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        proxyReq.setHeader("Cookie", cookieHeader);
      }
    },

    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response from: ${TARGET_SERVER}${req.url}`);
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
  })
);

if (NODE_ENV !== "production") {
  console.log("Running in development mode...");

  app.use(
    "/",
    createProxyMiddleware({
      target: REACT_DEV_SERVER,
      changeOrigin: true,
      ws: true,
      logLevel: "debug",
    })
  );
}

if (NODE_ENV === "production") {
  console.log("Running in production mode...");
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Reverse proxy server is running on http://localhost:${PORT}`);
});
