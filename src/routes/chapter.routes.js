const express = require("express");
const chapterController = require("../controller/chapter.controller");
const router = express.Router();
// Create
router.post("/", chapterController.createChapter);
router.get("/:storyId/last-chapter", chapterController.checkLastChapterWithStory);
router.get("/:storyId/chapter/:chapterId/user/:userId", chapterController.checkChapterStoryWithIdChap);
router.get("/list/lastest-chapter", chapterController.getChapterLastestUpdate);
router.post("/:storyId/mark-read/:chapNumber", chapterController.markRead)
router.get("/top-readers", chapterController.getTopUserRead);

router.get("/stories/:storyId/chapters/:chapNumber/comments", chapterController.getCommentsByChapter);

// Thêm bình luận mới
router.post("/stories/:storyId/chapters/:chapNumber/comments", chapterController.addComment);

// Xóa bình luận
router.delete("/comments/:commentId", chapterController.deleteComment);


module.exports = router;
