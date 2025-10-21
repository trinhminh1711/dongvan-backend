const express = require("express");
const forumController = require("../controller/forum.controller");
const router = express.Router();
const auth = require('../middlewares/middlewares.auth');
// Create
router.get("/post-forum/number/topic", forumController.getNumberPostForm);
router.get("/post-forum/category/:TopicId", forumController.getListPostForum);
router.get("/post-forum/get-post", forumController.getPost);
router.get("/post-forum/post/:postId/likes", forumController.getUsersLikedPost);
router.get("/post-forum/post-detail/:id", forumController.getPostDetailById);
router.post("/post-forum/comment/add", forumController.createCommentPost);
router.post("/post-forum/create-post", forumController.createPost);
router.post("/post-forum/comment/add-like", forumController.increaseLikeComment);
router.get("/post-forum/comment-likes/:commentId", forumController.getCommentLikes);
router.post("/post-forum/post/add-like", forumController.toggleLikePost);
router.post("/post-forum/comments/reply", forumController.createReply);

router.put("/post-forum/update/:postId/status", auth(["master_admin", "content_admin"]), forumController.updatePostStatus);

router.get("/post-forum/admin/get-post", auth(["master_admin", "content_admin"]), forumController.getAllPostAdmin);
module.exports = router;
