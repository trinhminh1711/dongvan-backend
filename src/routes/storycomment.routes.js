const express = require("express");
const upload = require("../config/upload");
const storyCommentController = require("../controller/storycomment.controller");
const router = express.Router();
// Create
router.put("/add", storyCommentController.createComment);
router.post("/comment/reply", storyCommentController.addReply);
router.get('/comment/:comment_id/replies', storyCommentController.getRepliesByComment);
module.exports = router;
