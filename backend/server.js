const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SSL + no Docker fallbacks for deployed environment
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // ✅ Required for hosted PostgreSQL (Render, Supabase, etc.)
  },
});

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedExact = [
        "http://localhost:8080",
        "http://127.0.0.1:8080",
      ];

      // ✅ Allow any Vercel preview or production deployment
      const allowedPattern = /^https:\/\/tp-docker-cicd.*\.vercel\.app$/;

      if (!origin || allowedExact.includes(origin) || allowedPattern.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// MAIN API ROUTE
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend!",
    timestamp: new Date().toISOString(),
    client: req.get("Origin") || "unknown",
    success: true,
  });
});

// DATABASE ROUTE
app.get("/db", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "user"'); // ✅ quoted reserved keyword
    res.json({
      message: "Data from Database",
      data: result.rows,
      timestamp: new Date().toISOString(),
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Database error please verify",
      error: err.message,
      success: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api`);
  console.log(`DB endpoint: http://localhost:${PORT}/db`);
});
