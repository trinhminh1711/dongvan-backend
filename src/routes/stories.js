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
module.exports = router;
