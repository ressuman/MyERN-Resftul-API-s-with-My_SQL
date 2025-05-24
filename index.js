const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use("/api/v1/students", studentRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Student Management API",
    version: "1.0.0",
    endpoints: {
      api: "/api/v1",
      students: "/api/v1/students",
    },
  });
});

// Test database connection on startup
const initializeApp = async () => {
  try {
    console.log("🚀 Starting Student Management API...");
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🖥️  Server: ${process.env.HOST}:${process.env.PORT}`);

    // Test database connection
    console.log("🔍 Testing database connection...");
    const dbConnected = await testConnection();
    console.log("✅ Database connection successful");
    if (!dbConnected) {
      throw new Error("Database connection failed");
    }

    // Start server
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`🎉 Server running at ${process.env.HOST_URL}`);
      console.log(`📡 API endpoint: ${process.env.HOST_URL}/api/v1/students`);
      console.log("✨ Ready to accept connections!");
    });
  } catch (error) {
    console.error("💥 Failed to start application:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
};

// Global error handlers
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error.message);
  console.error("Stack trace:", error.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Initialize the application
initializeApp();

module.exports = app;
