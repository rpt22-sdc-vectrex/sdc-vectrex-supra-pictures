const { randomPicsLogic } = require('./randomPicsLogic');

const generatePicturesData = (noOfRecords) => {

  let pictures = [];

  for (var i = 1; i < noOfRecords + 1; i++) {
    pictures.push({
      "item_pictures": randomPicsLogic(),
      "seller_picture":"https://picsum.photos/75/75",
      "store_picture":"https://picsum.photos/140/140"
    })
  }

  return pictures;
};

module.exports = { generatePicturesData };