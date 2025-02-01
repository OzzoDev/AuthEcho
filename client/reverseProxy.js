const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
require("dotenv").config();

const app = express();

// const PORT = process.env.PORT;
// const NODE_ENV = process.env.NODE_ENV;
// const API = process.env.API;
// const AUTHECHO_SERVER = process.env.AUTHECHO_SERVER;
// const APPNAME = process.env.APP_NAME;
// const AUTHECHO_API_KEY = process.env.AUTHECHO_API_KEY;

const PORT = 3002;
const NODE_ENV = "development";
const API = "http://localhost:3004";
const AUTHECHO_SERVER = "http://localhost:3000";
const APPNAME = "My app";
const AUTHECHO_API_KEY = "xxxxxxxxxxx";

const REACT_DEV_SERVER = "http://localhost:5174";
const USER_SESSION_DURATION = 168;

app.use(
  "/api",
  createProxyMiddleware({
    target: API,
    changeOrigin: true,
    pathRewrite: (_, req) => {
      return req.originalUrl.replace(/^\/api/, "");
    },
    onProxyReq: (proxyReq, req) => {
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        proxyReq.setHeader("Cookie", cookieHeader);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response from: ${AUTHECHO_SERVER}${req.url}`);
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

app.use("/authecho", (req, _, next) => {
  req.headers["authecho-app-name"] = APPNAME;
  req.headers["authecho-app-key"] = AUTHECHO_API_KEY;
  req.headers["user-session-duration"] = USER_SESSION_DURATION;

  next();
});

app.use(
  "/authecho",
  createProxyMiddleware({
    target: AUTHECHO_SERVER,
    changeOrigin: true,
    pathRewrite: (_, req) => {
      return req.originalUrl.replace(/^\/authecho/, "");
    },
    onProxyReq: (proxyReq, req) => {
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        proxyReq.setHeader("Cookie", cookieHeader);
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response from: ${AUTHECHO_SERVER}${req.url}`);
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
  app.use(express.static(path.join(__dirname, "public", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Authecho SDK Reverse proxy server is running on http://localhost:${PORT}`);
});
