const express = require("express"); // Web framework
const cors = require("cors"); // CORS management
const { Pool } = require("pg"); // PostgreSQL client

const app = express();
const PORT = process.env.PORT || 3000; // Configurable port

// Database connection configuration
const pool = new Pool({
  host: process.env.DB_HOST || "db",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "secret",
  database: process.env.DB_NAME || "mydb",
});

// CORS MIDDLEWARE: Allow cross-origin requests
app.use(
  cors({
    origin: [
      "http://localhost:8080", // Frontend via host port
      "http://127.0.0.1:8080", // Alternative localhost
      "http://backend", 
      "https://tp-docker-cicd-neon.vercel.app/"// Docker service name (internal tests)
    ],
    methods: ["GET", "POST", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allowed headers
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

// DATABASE ROUTE: Retrieve data from database
app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user");

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

// START SERVER
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api`);
  console.log(`DB endpoint: http://localhost:${PORT}/db`);
});
