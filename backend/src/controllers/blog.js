const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
const Tag = require("../models/tag");
const path = require("path");
const fs = require("fs");

exports.createBlogPost = async (req, res, next) => {
  const errors = validationResult(req);

  // jika ada error
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Tidak Sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  // mengecek file tidak ada
  if (!req.file) {
    const err = new Error("Image harus diupload");
    err.errorStatus = 422;
    err.data = errors.array();
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const user = req.user;

  if (!user) {
    res.status(401).json({ user, message: "Author not authenticated!" });
  }

  // Create an array to store the tags
  const tags = req.body.tags.trim().split(",");

  // Fetch the tag documents using the tags' slugs received in the request
  try {
    const tagObjects = await Promise.all(
      tags.map(async (tagSlug) => {
        const tag = await Tag.findOne({ slug: tagSlug });
        return tag;
      })
    );

    // Filter out any null values (tags not found) from the array
    const filteredTags = tagObjects.filter((tag) => tag !== null);

    // If any of the tags were not found, handle the error
    if (tagObjects.length !== filteredTags.length) {
      throw new Error("Some tags not found");
    }

    // If all tags were found, create the BlogPost with the tags
    const Posting = new BlogPost({
      title: title,
      body: body,
      image: image,
      author: {
        uid: user.uid,
        name: user.name,
      },
      tags: filteredTags,
    });

    const savedPost = await Posting.save();

    res.status(201).json({
      message: "Create Blog Post Success",
      data: savedPost,
    });
  } catch (error) {
    console.log("Error creating blog post:", error);
    res.status(500).json({
      message: "Error creating blog post",
    });
  }
};

exports.getAllBlogPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 6;
  let totalItems;

  BlogPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
        .populate("tags");
    })
    .then((result) => {
      const modifiedResult = result.map((blog) => {
        const shortenedBody =
          blog.body.length > 100
            ? blog.body.substring(0, 100) + "..."
            : blog.body;
        return { ...blog._doc, body: shortenedBody };
      });

      res.status(200).json({
        message: "Data Blog Post berhasil dipanggil",
        data: modifiedResult,
        total_data: totalItems,
        per_page: perPage,
        current_page: currentPage,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .populate("tags")
    .then((result) => {
      if (!result) {
        const error = new Error("Input Value Tidak Sesuai");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "Data Blog Post berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateBlogPost = async (req, res, next) => {
  const errors = validationResult(req);

  // jika ada error
  if (!errors.isEmpty()) {
    const err = new Error("Input Value Does Not Match");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  // mengecek file tidak ada
  if (!req.file) {
    const err = new Error("Image must be uploaded");
    err.errorStatus = 422;
    err.data = errors.array();
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const postId = req.params.postId;
  const tags = req.body.tags.trim().split(",");

  const tagObjects = await Promise.all(
    tags.map(async (tagSlug) => {
      const tag = await Tag.findOne({ slug: tagSlug });
      return tag;
    })
  );

  // Filter out any null values (tags not found) from the array
  const filteredTags = tagObjects.filter((tag) => tag !== null);

  // If any of the tags were not found, handle the error
  if (tagObjects.length !== filteredTags.length) {
    throw new Error("Some tags not found");
  }

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post not found");
        err.status = 404;
        throw err;
      }

      // Check if the logged-in user is the author of the blog post
      if (post.author.uid.toString() !== req.user.uid.toString()) {
        const err = new Error(
          "Unauthorized: You are not the author of this blog post"
        );
        err.status = 403; // Forbidden status code
        throw err;
      }

      post.title = title;
      post.body = body;
      post.image = image;
      post.tags = filteredTags;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Update Success",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post tidak ditemukan");
        err.status = 404;
        throw err;
      }

      // Check if the logged-in user is the author of the blog post
      if (post.author.uid.toString() !== req.user.uid.toString()) {
        const err = new Error(
          "Unauthorized: You are not the author of this blog post"
        );
        err.status = 403; // Forbidden status code
        throw err;
      }

      removeImage(post.image);
      return BlogPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "Hapus Blog Post Berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  // console.log("filePath ", filePath);
  // console.log("dirname ", __dirname);

  filePath = path.join(__dirname, "../..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
};

exports.getAllMyBlog = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 6;
  let totalItems;

  const loggedInUserId = req.user.uid;

  BlogPost.find({ "author.uid": loggedInUserId })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return BlogPost.find({ "author.uid": loggedInUserId })
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
        .populate("tags");
    })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: "Posts Not Created",
          data: [],
          total_data: 0,
          per_page: perPage,
          current_page: currentPage,
        });
      } else {
        const modifiedResult = result.map((blog) => {
          const shortenedBody =
            blog.body.length > 100
              ? blog.body.substring(0, 100) + "..."
              : blog.body;
          return { ...blog._doc, body: shortenedBody };
        });

        res.status(200).json({
          message: "Data Blog Post berhasil dipanggil",
          data: modifiedResult,
          total_data: totalItems,
          per_page: perPage,
          current_page: currentPage,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.handleLikes = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post tidak ditemukan");
        err.status = 404;
        throw err;
      }

      post.likes += 1;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Like Post Berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.handleUnlikes = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post tidak ditemukan");
        err.status = 404;
        throw err;
      }

      post.likes -= 1;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Unlike Post Berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
