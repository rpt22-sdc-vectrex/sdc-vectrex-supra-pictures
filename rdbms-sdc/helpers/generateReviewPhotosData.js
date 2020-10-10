const generateReviewPhotosData = (noOfRecords) => {

  let pictures = [];

  for (var i = 1; i < noOfRecords + 1; i++) {
    pictures.push({
      // "id": i,
      "user_picture": "https://picsum.photos/75/75",
      "review_picture":"https://picsum.photos/140/140"
    })
  }

  return pictures;
};

module.exports = { generateReviewPhotosData };