// File: models/userModel.js

const createUserModel = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.STRING,
    },
    {
      table: "users",
      timestamps: true,
      paranoid: true,
    }
  );

  return User;
};

module.exports = createUserModel;
