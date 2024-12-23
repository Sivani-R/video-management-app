const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  fileSize: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  videoUrl: String,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
