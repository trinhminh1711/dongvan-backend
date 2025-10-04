const express = require("express");
const multer = require("multer");
const mailController = require("../controller/mail.controller");

const router = express.Router();

// cấu hình multer
const upload = multer({ storage: multer.memoryStorage() });

// API gửi mail
router.post("/send", mailController.sendMail);
router.post("/transactions/request", mailController.createRequest);
// API gửi yêu cầu hỗ trợ (có file đính kèm)
router.post("/support/request", upload.single("file"), mailController.supportRequest);

// API lấy danh sách yêu cầu hỗ trợ
router.get("/support/request", mailController.getSupportRequest);
router.get("/payment/request", mailController.getPaymentRequest);
router.put("/transactions/:id/approve" , mailController.approveTrantion)
module.exports = router;
