const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
const path = require("path");
const fs = require("fs");
const { auth } = require("../../config/firebaseConfig");

exports.createBlogPost = (req, res, next) => {
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
  console.log("req.user: ", user);
  if (!user) {
    res.status(401).json({ user, message: "Author not authenticated!" });
  }

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      uid: "1",
      name: "user",
    },
  });

  Posting.save()
    .then((result) => {
      res
        .status(201)
        .json({ message: "Create Blog Post Success", data: result });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};

exports.getAllBlogPost = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalItems;

  BlogPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return BlogPost.find()
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage));
    })
    .then((result) => {
      res.status(200).json({
        message: "Data Blog Post berhasil dipanggil",
        data: result,
        total_data: totalItems,
        per_page: perPage,
        current_page: currentPage,
      });
    })
    .catch((err) => {
      next(err);
    });

  // BlogPost.find()
  //   .then((result) => {
  //     res.status(200).json({
  //       message: "Data Blog Post berhasil dipanggil",
  //       data: result,
  //     });
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
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

exports.updateBlogPost = (req, res, next) => {
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
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("Blog Post tidak ditemukan");
        err.status = 404;
        throw err;
      }
      post.title = title;
      post.body = body;
      post.image = image;

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
