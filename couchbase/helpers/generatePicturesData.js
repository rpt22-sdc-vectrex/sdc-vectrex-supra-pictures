const { randomPicsLogic } = require('./randomPicsLogic');
let counter = 1;

const generatePicturesData = (noOfRecords) => {

  let pictures = [];

  for (var i = 1; i < noOfRecords + 1; i++) {
    pictures.push({
      "_scope": "_default",
      "item_id": counter++,
      "item_pictures": randomPicsLogic(),
      "seller_picture":"https://picsum.photos/75/75",
      "store_picture":"https://picsum.photos/140/140",
      "type": "pictures"
    })
  }

  return pictures;
};

module.exports = { generatePicturesData };