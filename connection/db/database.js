// File: connection/db/database.js

const mysql = require("mysql2/promise");
const config = require("./config");
const colors = require("colors");

let pool;

const connectDB = async () => {
  try {
    pool = mysql.createPool(config);
    console.log(
      "✅".green +
        ` Connected to MySQL database: `.bold +
        `${config.database}`.cyan
    );
    return pool;
  } catch (error) {
    console.error(
      "❌".red + ` Database connection failed:`.bold,
      error.message.yellow
    );
    process.exit(1);
  }
};

const testConnection = async () => {
  try {
    if (!pool) {
      throw new Error("Connection pool is not initialized");
    }

    console.log("🔍".blue + " Testing database connection...".italic);
    const connection = await pool.getConnection();
    await connection.query("SELECT 1");
    connection.release();
    console.log("✅".green + " Database test successful.".bold);
    return true;
  } catch (err) {
    console.error(
      "❌".red + " Test connection failed:".bold,
      err.message.yellow
    );
    return false;
  }
};

module.exports = connectDB;
module.exports.testConnection = testConnection;
module.exports.getPool = () => pool;
