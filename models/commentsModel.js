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

  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, { foreignKey: "postId" });
    Comment.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Comment;
};

module.exports = createCommentModel;
