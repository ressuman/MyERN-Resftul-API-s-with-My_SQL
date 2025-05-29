// File: models/categoryModel.js

const createCategoryModel = function (sequelize, DataTypes) {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      commentId: {
        type: DataTypes.INTEGER,
      },
      postId: {
        type: DataTypes.INTEGER,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
    },
    {
      tableName: "categories",
      timestamps: true,
      paranoid: true,
    }
  );

  return Category;
};

module.exports = createCategoryModel;
