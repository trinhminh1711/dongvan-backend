const express = require("express");
const upload = require("../config/upload");
const storiesController = require("../controller/stories.controller");
const router = express.Router();
// Create
router.post("/", upload.single("cover"), storiesController.createStory);

// Update

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

router.get("/check/storylike", storiesController.checkFavoriteData)

router.get("/favorite/:userId", storiesController.getListFavorites)
module.exports = router;
