const express = require("express");
const forumController = require("../controller/forum.controller");
const router = express.Router();
// Create
router.get("/post-forum/category/:TopicId", forumController.getListPostForum);
router.get("/post-forum/get-post", forumController.getPost);
router.get("/post-forum/post-detail/:id", forumController.getPostDetailById);
router.post("/post-forum/comment/add", forumController.createCommentPost);
router.post("/post-forum/create-post", forumController.createPost);
router.post("/post-forum/comment/add-like", forumController.increaseLikeComment);
module.exports = router;
