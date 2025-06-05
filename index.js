import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const NGROK_URL = process.env.NGROK_URL || "https://b9ff-178-91-150-153.ngrok-free.app";

// Проксируем только пути, которые нужны (например, /login, /api, /auth и т.д.)
app.use(['/login', '/auth', '/api'], createProxyMiddleware({
  target: NGROK_URL,
  changeOrigin: true,
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("ngrok-skip-browser-warning", "true");
  }
}));

// Все остальные запросы (например, `/`) — отдаём обычным текстом
app.get("/", (req, res) => {
  res.send("⚡ Ngrok-прокси работает! Используй /login или /api/...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
