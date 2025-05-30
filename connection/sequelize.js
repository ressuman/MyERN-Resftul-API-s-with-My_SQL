// File: connection/sequelize.js

const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

// Extract and validate environment variables
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  DB_CONNECTION_LIMIT,
  DB_IDLE_TIMEOUT,
  DB_QUEUE_LIMIT,
  DB_MAX_IDLE,
  DB_ENABLE_KEEP_ALIVE,
  DB_KEEP_ALIVE_INITIAL_DELAY,
  NODE_ENV,
} = process.env;

console.log(DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT);

assert(DB_HOST, "DB_HOST is required");
assert(DB_PORT, "DB_PORT is required");
assert(DB_NAME, "DB_NAME is required");
assert(DB_USER, "DB_USER is required");
assert(DB_PASSWORD, "DB_PASSWORD is required");

// Initialize Sequelize with MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: NODE_ENV === "development" ? console.log : false,
  pool: {
    max: parseInt(DB_CONNECTION_LIMIT, 10) || 10,
    min: parseInt(DB_QUEUE_LIMIT, 10) || 0,
    acquire: parseInt(DB_IDLE_TIMEOUT, 10) || 60000,
    idle: parseInt(DB_IDLE_TIMEOUT, 10) || 60000,
    evict: parseInt(DB_MAX_IDLE, 10) || 10,
  },
  dialectOptions: {
    connectTimeout: parseInt(DB_IDLE_TIMEOUT, 10) || 60000,
    enableKeepAlive: DB_ENABLE_KEEP_ALIVE === "true",
    keepAliveInitialDelay: parseInt(DB_KEEP_ALIVE_INITIAL_DELAY, 10) || 0,
  },
});

// Test the connection
const testConnection = function () {
  sequelize
    .authenticate()
    .then(function () {
      console.log("\u2705 Connected to MySQL via Sequelize.");
    })
    .catch(function (error) {
      console.error("\u274C Unable to connect to the database:", error.message);
      process.exit(1);
    });
};

module.exports = sequelize;
module.exports.testConnection = testConnection;
