const express = require("express");
const router = express.Router();
const { textToSpeech } = require("../controllers/ttsController");

router.post("/", textToSpeech);

module.exports = router;