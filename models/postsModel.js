// File: models/postsModel.js

const createPostModel = function (sequelize, DataTypes) {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
    },
    {
      tableName: "posts",
      timestamps: true,
      paranoid: true,
    }
  );

  return Post;
};

module.exports = createPostModel;
