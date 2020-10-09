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
    async (cb) => {
      count++;
      console.log('Pic count: ', count);
      let picData = await generatePicturesData(10000);

      await Pictures.insertMany(picData)
        .then(() => {
          console.log('Filled photos');
          cb();
        })
        .catch((err) => {
          console.log(err.reason);
        });
    },
    () => {
      console.log('Complete seeding 1 million records for Pictures!!');
      console.log('Complete iteration!' + '\n' + 'Press ctrl + c to exit');
    }
  );

};

const insertReviewPhotos = function () {

  let count = 0;
  async.whilst(
    () => count < 10,
    async (cb) => {
      count++;
      console.log('Review pic count: ', count);
      let reviewPicData = await generateReviewPhotosData(10000);

      await ReviewPhotos.insertMany(reviewPicData)
        .then(() => {
          console.log('Filled Review Photos');
          cb();
        })
        .catch((err) => {
          console.log(err.reason);
        });
    },
    () => {
      console.log('Complete seeding 1 million records for Review Photos!!');
      console.log('Complete iteration!' + '\n' + 'Press ctrl + c to exit');
    }
  );

};

insertPictures();
insertReviewPhotos();




