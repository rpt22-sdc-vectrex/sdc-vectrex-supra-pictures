const mongoose = require('mongoose');
const db = require('../index');

const PicturesSchema = mongoose.Schema({
  item_id: Number,
  item_pictures: [{ large: String, normal: String, thumbnail: String }],
  seller_picture: String,
  store_picture: String,
});

// Pictures Collection
const Pictures = mongoose.model('Pictures', PicturesSchema);

module.exports.Pictures = Pictures;