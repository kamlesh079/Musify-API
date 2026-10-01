const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
  const result = await client.files.upload({
    file,
    fileName: "music_" + Date.now() + ".mp3",
    folder: "Musify/music",
  });
  return result;
}

module.exports = { uploadFile };
