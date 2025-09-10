const express = require("express");
const chapterController = require("../controller/chapter.controller");
const router = express.Router();
// Create
router.post("/", chapterController.createChapter);
router.get("/:storyId/last-chapter", chapterController.checkLastChapterWithStory);
router.get("/:storyId/chapter/:chapterId", chapterController.checkChapterStoryWithIdChap);
router.get("/list/lastest-chapter", chapterController.getChapterLastestUpdate);
module.exports = router;
