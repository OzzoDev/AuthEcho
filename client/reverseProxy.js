const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001; // Reverse proxy port
const NODE_ENV = process.env.NODE_ENV || "development";
const TARGET_SERVER = process.env.TARGET_SERVER || "http://localhost:3000"; // Backend server
const REACT_DEV_SERVER = "http://localhost:5173"; // React Vite dev server

// Proxy React's Vite Dev Server in Development Mode
if (NODE_ENV !== "production") {
  console.log("Running in development mode...");

  app.use(
    "/",
    createProxyMiddleware({
      target: REACT_DEV_SERVER, // Vite dev server
      changeOrigin: true,
      ws: true, // Enable WebSocket for Vite's HMR (Hot Module Reloading)
      logLevel: "debug", // Optional: Debug proxy requests
    })
  );
}

// Serve Static Files from React's Build Output in Production Mode
if (NODE_ENV === "production") {
  console.log("Running in production mode...");
  app.use(express.static(path.join(__dirname, "public", "dist"))); // Serve React build files

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
  });
}

// Proxy API Requests to the Backend Server
app.use(
  "/api",
  createProxyMiddleware({
    target: TARGET_SERVER,
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Remove "/api" prefix before forwarding to the backend
    },
    onProxyReq: (proxyReq, req, res) => {
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        proxyReq.setHeader("Cookie", cookieHeader); // Forward cookies
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
  })
);

// Start the Reverse Proxy Server
app.listen(PORT, () => {
  console.log(`Reverse proxy server is running on http://localhost:${PORT}`);
});
