const express = require("express");
const authorController = require("../controller/author.controller");
const router = express.Router();
router.post("/recommendation/story", authorController.voteStory);
router.get("/recommendation/story/:storyId/user/:userId", authorController.getStoryVoted);

router.post("/stories/:storyId/rating", authorController.rateStory);

router.post("/give/gift-story", authorController.giveSupport);

router.get("/transaction/:user_id", authorController.getUserTransactions);

// Lấy trung bình rating

// Lấy danh sách comment
router.get("/stories/:storyId/comments", authorController.getStoryRate);
module.exports = router;