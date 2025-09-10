const express = require("express");
const upload = require("../config/upload");
const storyCommentController = require("../controller/storycomment.controller");
const router = express.Router();
// Create
router.put("/add", storyCommentController.createComment);
router.post("/add-like", storyCommentController.increaseLikeComment);

module.exports = router;
