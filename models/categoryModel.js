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
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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

  Category.associate = function (models) {
    Category.hasMany(models.Post, { foreignKey: "categoryId" });
    Category.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Category;
};

module.exports = createCategoryModel;
