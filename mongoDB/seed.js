/* eslint-disable no-console */
let async = require('async');
const { Pictures } = require('./models/pictures.model');
const { ReviewPhotos } = require('./models/reviewPics.model');
const { generatePicturesData } = require('./helpers/generatePicturesData');
const { generateReviewPhotosData } = require('./helpers/generateReviewPhotosData');

const insertPictures = function () {

  let count = 0;
  async.whilst(
    () => count < 10,
    (cb) => {
      count++;
      console.log('Pic count: ', count);
      let picData = generatePicturesData(10000); // - 3 min pg ? couch ?

      Pictures.create(picData)
        .then(() => {
          console.log('Filled photos');
          cb();
        })
        .catch((err) => {
          console.log('Complete seeding 1 million records for Pictures!!');
          console.log('Complete iteration! expected - ', err.reason + '\n' + 'Press ctrl + c to exit');
        });
    }
  );

};

const insertReviewPhotos = function () {

  let count = 0;
  async.whilst(
    () => count < 10,
    (cb) => {
      count++;
      console.log('Review pic count: ', count);
      let reviewPicData = generateReviewPhotosData(10000);

      ReviewPhotos.create(reviewPicData)
        .then(() => {
          console.log('Filled Review Photos');
          cb();
        })
        .catch((err) => {
          console.log('Complete seeding 1 million records for Review Photos!!');
          console.log('Complete iteration! expected - ', err.reason + '\n' + 'Press ctrl + c to exit');
        });
    }
  );

};

insertPictures();
// insertReviewPhotos();




