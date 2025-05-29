// File: index.js

const fs = require("fs");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const postsRoutes = require("./routes/postsRoutes");
// const commentsRoutes = require("./routes/commentsRoutes");
// const imagesRoutes = require("./routes/imagesRoutes");
// const testRoutes = require("./routes/testRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan Logging (colored)
// Setup morgan for logging
if (process.env.NODE_ENV === "development") {
  // Colorful dev logging to console
  app.use(
    morgan((tokens, req, res) => {
      return [
        colors.cyan(tokens.method(req, res)),
        colors.yellow(tokens.url(req, res)),
        colors.green(tokens.status(req, res)),
        colors.magenta(tokens["response-time"](req, res) + "ms"),
      ].join(" ");
    })
  );
} else {
  // Standard logging to access.log file in production
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  app.use(morgan("combined", { stream: accessLogStream }));
}

// Routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/posts", postsRoutes);
// app.use("/api/v1/comments", commentsRoutes);
// app.use("/api/v1/images", imagesRoutes);
// app.use("/api/v1/test", testRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).send(`
  <html>
      <head><title>Student Management API</title></head>
      <body style="font-family: sans-serif">
        <h1 style="color: darkblue">Welcome to the Student Management API</h1>
        <p>This API allows you to manage student records efficiently.</p>
        <p><strong>Message:</strong> Student Management API</p>
        <p><strong>Version:</strong> 1.0.0</p>
        <ul>
          <li>API Base: <code>/api/v1</code></li>
          <li>Students Endpoint: <code>/api/v1/students</code></li>
        </ul>
      </body>
    </html>
  `);
});

// Testing MySql Connection
app.get("/test-db", async (req, res) => {
  try {
    // await testConnection();
    // const [results] = await sequelize.query("SELECT NOW() AS current_time");
    // const [dbName] = await sequelize.query(
    //   "SELECT current_database() AS db_name"
    // );

    res.status(200).json({
      message: "Database connection successful (via Sequelize)",
      currentTime: results[0].current_time,
      database: dbName[0].db_name,
    });
  } catch (error) {
    console.error("❌ Database connection error:", error.message.red);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Test database connection on startup
const initializeApp = async () => {
  try {
    console.log("🚀 Starting Student Management API...".cyan.bold);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`.blue);
    console.log(`🖥️  Server: ${process.env.HOST}:${process.env.PORT}`.yellow);

    // Test database connection
    // await testConnection(); // Sequelize test
    // await db.sequelize.sync({ alter: true });

    // Start server
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`🎉 Server running at ${process.env.HOST_URL}`.rainbow);
      console.log(
        `📡 API endpoint: ${process.env.HOST_URL}/api/v1/students`.bgMagenta
          .italic.underline
      );
      console.log("✨ Ready to accept connections!".bold.green);
    });
  } catch (error) {
    console.error(
      "💥 Failed to start application:".red.bold,
      error.message.red
    );
    console.error("Stack trace:".gray, error.stack);
    process.exit(1);
  }
};

// Global error handlers
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:".bgRed.white, error.message);
  console.error("Stack trace:".gray, error.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:".bgRed.white, promise);
  console.error("Reason:".gray, reason);
  process.exit(1);
});

// Initialize the application
initializeApp();

module.exports = app;
