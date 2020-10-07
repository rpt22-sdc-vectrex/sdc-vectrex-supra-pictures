const mongoose = require('mongoose');
const db = require('../index');

// ReviewPhotos collection
const ReviewPhotosSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  user_picture: String,
  review_picture: String,
});

const ReviewPhotos = mongoose.model('ReviewPhotos', ReviewPhotosSchema);


module.exports.ReviewPhotos = ReviewPhotos;