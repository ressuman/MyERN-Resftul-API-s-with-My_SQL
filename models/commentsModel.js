// File: models/commentsModel.js

const createCommentModel = function (sequelize, DataTypes) {
  const Comment = sequelize.define(
    "Comment",
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
      postId: {
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
      tableName: "comments",
      timestamps: true,
      paranoid: true,
    }
  );

  return Comment;
};

module.exports = createCommentModel;
