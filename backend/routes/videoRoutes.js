const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const auth = require('../middleware/auth');

router.post('/upload', auth, async (req, res) => {
  const { title, description, tags, fileSize, videoUrl } = req.body;
  const video = new Video({
    title,
    description,
    tags,
    fileSize,
    userId: req.user._id,
    videoUrl
  });

  try {
    await video.save();
    res.status(201).send(video);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find({ userId: req.user._id });
    res.send(videos);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
