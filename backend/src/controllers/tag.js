var slugify = require("slugify");
const Tag = require("../models/tag");

exports.createTag = (req, res, next) => {
  const name = req.body.name;

  const newTag = new Tag({
    name: name,
    slug: slugify(name, { lower: true }),
  });

  newTag
    .save()
    .then((result) => {
      res.status(201).json({ message: "Create Tag Success", data: result });
    })
    .catch((err) => {
      console.log("err ", err);
    });
};
