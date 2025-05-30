// File: models/index.js

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../connection/sequelize");

const db = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.toLowerCase().includes("model")
    );
  })
  .forEach((file) => {
    const modelFactory = require(path.join(__dirname, file));
    const model = modelFactory(sequelize, Sequelize.DataTypes);

    // Derive model name from filename if not explicitly set
    const filename = path.basename(file, ".js"); // e.g. "userModel"
    const defaultModelName = filename
      .replace(/model$/i, "") // Remove 'model' or 'Model' from end
      .replace(/^./, (c) => c.toUpperCase()); // capitalize first letter

    const modelName = model?.name || defaultModelName;
    db[modelName] = model;

    console.log(`📦 Loaded model: ${modelName}`);
  });

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log("✅ models/index.js loaded. Exported keys:", Object.keys(db));

module.exports = db;
