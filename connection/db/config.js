// File: connection/db/config.js

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CONNECTION_LIMIT,
  DB_WAIT_FOR_CONNECTIONS,
  DB_QUEUE_LIMIT,
  DB_IDLE_TIMEOUT,
  DB_MAX_IDLE,
  DB_ENABLE_KEEP_ALIVE,
  DB_KEEP_ALIVE_INITIAL_DELAY,
} = process.env;

// Validate required env vars
assert(DB_HOST, "DB_HOST is required");
assert(DB_PORT, "DB_PORT is required");
assert(DB_NAME, "DB_NAME is required");
assert(DB_USER, "DB_USER is required");
assert(DB_PASSWORD, "DB_PASSWORD is required");

const config = {
  // Database connection settings
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,

  // Pool settings
  waitForConnections: DB_WAIT_FOR_CONNECTIONS === "true",
  connectionLimit: parseInt(DB_CONNECTION_LIMIT || "10", 10),
  queueLimit: parseInt(DB_QUEUE_LIMIT || "0", 10),
  maxIdle: parseInt(DB_MAX_IDLE || "10", 10),

  // Optional settings
  idleTimeout: parseInt(DB_IDLE_TIMEOUT || "10000", 10), // 10 seconds

  // Keep-alive settings
  enableKeepAlive: DB_ENABLE_KEEP_ALIVE === "true",
  keepAliveInitialDelay: parseInt(DB_KEEP_ALIVE_INITIAL_DELAY || "0", 10), // 0 means no delay
};

module.exports = config;
