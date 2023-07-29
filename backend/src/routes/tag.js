const express = require("express");
const router = express.Router();

const tagController = require("../controllers/tag");

// CREATE -> POST
router.post("/create", tagController.createTag);

module.exports = router;
