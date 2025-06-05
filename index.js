import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const NGROK_URL = process.env.NGROK_URL || "https://example.ngrok-free.app";

app.use("/", createProxyMiddleware({
  target: NGROK_URL,
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("ngrok-skip-browser-warning", "true");
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
