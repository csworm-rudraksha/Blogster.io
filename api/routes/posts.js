const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// ✅ CREATE POST
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Post Creation Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.username !== req.body.username) {
      return res.status(403).json({ message: "You can update only your post" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error("Update Post Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.username !== req.body.username) {
      return res.status(403).json({ message: "You can delete only your post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post has been deleted" });
  } catch (err) {
    console.error("Delete Post Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ GET A SINGLE POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    console.error("Get Post Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const { user, cat } = req.query;
    let posts;

    if (user) {
      posts = await Post.find({ username: user });
    } else if (cat) {
      posts = await Post.find({ categories: { $in: [cat] } });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error("Get Posts Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
