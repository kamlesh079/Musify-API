const express = require("express");
const { createMusic } = require("../controllers/music.controller");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", upload.single("music"), createMusic);

module.exports = router;
