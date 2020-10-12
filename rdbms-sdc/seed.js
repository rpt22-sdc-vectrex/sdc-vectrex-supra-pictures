let async = require('async');
const db = require('./index');
const Pictures = db.pictures;
const ReviewPhotos = db.reviewPhotos;
const { generatePicturesData } = require('./helpers/generatePicturesData');
const { generateReviewPhotosData } = require('./helpers/generateReviewPhotosData');

const insertPictures =  function () {
  db.sequelize.sync({ });
  let count = 0;
  async.whilst(
    () => count < 1000,
    async (cb) => {
      count++;
      console.log('Pic count: ', count);
      let picData = await generatePicturesData(10000);

      await Pictures.bulkCreate(picData)
        .then(() => {
          console.log('Filled photos');
          cb();
        })
        .catch((err) => {
          console.log(err, '***', err.reason);
        });
    },
    () => {
      console.log('Complete seeding 1 million records for Pictures!!');
      console.log('Complete iteration!' + '\n' + 'Press ctrl + c to exit');
    }
  );

};

const insertReviewPhotos = function () {
  db.sequelize.sync({ });
  let count = 0;
  async.whilst(
    () => count < 1000,
    async (cb) => {
      count++;
      console.log('Review pic count: ', count);
      let reviewPicData = await generateReviewPhotosData(10000);

      await ReviewPhotos.bulkCreate(reviewPicData)
        .then(() => {
          console.log('Filled Review Photos');
          cb();
        })
        .catch((err) => {
          console.log(err, '***', err.reason);
        });
    },
    () => {
      console.log(`Complete seeding ${(count-1) * 10000} million records for Review Photos!!`);
      console.log('Complete iteration!' + '\n' + 'Press ctrl + c to exit');
    }
  );

};

async function startSeed() {
  await insertPictures();
  await insertReviewPhotos();
}

startSeed();



