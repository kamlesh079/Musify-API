const express = require("express");
const {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbum,
  getAlbumById,
} = require("../controllers/music.controller");
const multer = require("multer");
const { authArtist, authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post("/upload", authArtist, upload.single("music"), createMusic);
router.post("/album", authArtist, createAlbum);

router.get("/", authUser, getAllMusics);
router.get("/album", authUser, getAllAlbum);
router.get("/album/:albumId", authUser, getAlbumById);

module.exports = router;
