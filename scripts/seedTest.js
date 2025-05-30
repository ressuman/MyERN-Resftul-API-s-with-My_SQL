// File: scripts/seedTest.js

const db = require("../models");

const runTest = async function () {
  try {
    // Debug: Check what models are available
    console.log("🔍 Available models:", Object.keys(db));
    console.log("🔍 User model exists:", !!db.User);
    console.log("🔍 Category model exists:", !!db.Category);
    console.log("🔍 Post model exists:", !!db.Post);
    console.log("🔍 Comment model exists:", !!db.Comment);

    // Destructure models from db object
    const { User, Category, Post, Comment } = db;

    // Check if models are properly loaded
    if (!User || !Category || !Post || !Comment) {
      throw new Error("One or more models are undefined. Check model loading.");
    }

    await db.sequelize.sync({ force: true });
    console.log("🧼 Database synced (force: true)");

    // 1. Create a User
    const user = await User.create({
      name: "Jane Doe",
      email: "jane@example.com",
      password: "securepass123",
    });
    console.log("👤 User created:", user.toJSON());

    // 2. Create a Category
    const category = await Category.create({
      name: "Tech News",
      userId: user.id,
    });
    console.log("📂 Category created:", category.toJSON());

    // 3. Create a Post
    const post = await Post.create({
      title: "New JavaScript Features",
      content: "Let's talk about ES2025...",
      image_url: null,
      categoryId: category.id,
      userId: user.id,
      createdBy: user.id,
    });
    console.log("📝 Post created:", post.toJSON());

    // 4. Create a Comment
    const comment = await Comment.create({
      content: "This is awesome!",
      postId: post.id,
      userId: user.id,
      createdBy: user.id,
    });
    console.log("💬 Comment created:", comment.toJSON());

    // 5. Fetch Post with associations
    const postWithRelations = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: User, as: "User" },
        { model: Category, as: "Category" },
        { model: Comment, as: "Comments" },
      ],
    });

    console.log("\n📊 Post with associations:");
    console.log(JSON.stringify(postWithRelations, null, 2));

    console.log("\n✅ All associations tested successfully.");
  } catch (error) {
    console.error("❌ Error during seed test:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  } finally {
    if (db.sequelize) {
      await db.sequelize.close();
      console.log("\n🔌 DB connection closed.");
    }
  }
};

runTest();
