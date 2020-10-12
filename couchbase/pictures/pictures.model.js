const ottoman = require('ottoman');

const PicturesSchema = new ottoman.Schema({
  'item_id': { type: Number, required: true },
  'item_pictures': [
    {
      'large': String,
      'medium': String,
      'thumbnail': String,
    }
  ],
  'seller_picture': String,
  'store_picture': String
});

PicturesSchema.index.findByItemId = { by: 'item_id',  type: 'n1ql'};
// PicturesSchema.index.ID_KEY = 'item_id';

const PicturesModel = ottoman.model('pictures', PicturesSchema);

module.exports = {
  PicturesModel
}
