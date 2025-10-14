const express = require("express");
const upload = require("../config/upload");
const storiesController = require("../controller/stories.controller");
const router = express.Router();
// Create
router.post("/", upload.single("cover"), storiesController.createStory);

//get
router.get("/story/get-all", storiesController.getAllStory)
router.get("/story/recommendations", storiesController.getTopStoryRecomment)
router.get("/:id", storiesController.getStory);
router.get("/story/:id", storiesController.getStoryById);
router.put("/edit-story/:id", upload.single("cover"), storiesController.updateStory);
// Delete
router.delete("/:id", storiesController.deleteStory);
router.get("/category/:id", storiesController.getStoryByCategory)
router.get("/story-allinfo/:id", storiesController.getAllDataStory)
router.get("/:id/comments", storiesController.getCommentStory)
router.post("/story/reading", storiesController.insertUserReadingBook)
router.get("/user/reading/:user_id", storiesController.getUserReadingList)
router.post("/user-story/favorite", storiesController.addFavorite)

router.get("/random/story", storiesController.getRandomStory)
router.get("/complete/story", storiesController.getStoryComplete)

router.get("/check/storylike", storiesController.checkFavoriteData)
router.get("/check/top-reader", storiesController.getTopStoryReaded);
router.get("/check/top-reader/month", storiesController.getTopStoryReadedForMonth);
router.get("/check/top-author/week", storiesController.getTopAuthorForWeek);
router.get("/check/top-user/reader", storiesController.getTopUserReadersStory);
router.get("/check/just-updated", storiesController.getListStoryUpdated);
router.get("/favorite/:userId", storiesController.getListFavorites)




router.post("/unlock-chapter/user/:userId/story/:storyId",storiesController.unlockChapters) ;
router.get("/:storyId/chapters/count", storiesController.getNumberChapterStory);
router.get("/:storyId/chapters/user/:userId/notpurchase", storiesController.getNumberChapterStoryNotPurchase);
module.exports = router;
