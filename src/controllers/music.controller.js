const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");

async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({ message: "Music uploaded successfully", music });
}

async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    musics: musics,
    artist: req.user.id, // who created the album
  });

  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      musics: album.musics,
      artist: album.artist,
    },
  });
}

async function getAllMusics(req, res) {
  const musics = await musicModel
    .find()
    .skip(1)
    .limit(10)
    .populate("artist", "username email");
  // .populate(param1, param2) => para1 is the field to populate and para2 is the fields to select from the populated document, if only param1 is provided then all fields will be selected from the populated document

  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics,
  });
}

async function getAllAlbum(req, res) {
  const albums = await albumModel
    .find()
    .select("title, artist")
    .populate("artist", "username email");
  // .populate("musics", "title uri");

  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums,
  });
}

async function getAlbumById(req, res) {
  const { albumId } = req.params;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate("musics");

  res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbum,
  getAlbumById,
};
