
const express = require("express");

const router = express.Router();

const {
    sendBulkEmail,
    getEmailHistory
} = require("../controllers/emailController");

router.post("/send", sendBulkEmail);
router.get("/history", getEmailHistory);

module.exports = router;
