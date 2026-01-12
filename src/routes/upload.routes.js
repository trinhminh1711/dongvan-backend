const upload = require("../config/upload")
const express = require("express");
const router = express.Router();
const uploadController = require("../controller/upload.controller");
router.post("/chapter", upload.single("image"), uploadController.uploadImage)
module.exports = router;