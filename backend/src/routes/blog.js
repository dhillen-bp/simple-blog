const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const blogController = require("../controllers/blog");
const blog = require("../models/blog");

// CREATE -> POST
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("input title tidak sesuai"),
    body("body").isLength({ min: 5 }).withMessage("input body tidak sesuai"),
  ],
  blogController.createBlogPost
);
router.get("/posts", blogController.getAllBlogPost);
router.get("/post/:postId", blogController.getBlogPostById);
router.put(
  "/post/:postId",
  [
    body("title").isLength({ min: 5 }).withMessage("input title tidak sesuai"),
    body("body").isLength({ min: 5 }).withMessage("input body tidak sesuai"),
  ],
  blogController.updateBlogPost
);
router.delete("/post/:postId", blogController.deleteBlogPost);

module.exports = router;
