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
    () => count < 1,
    async (cb) => {
      count++;
      console.log('Pic count: ', count);
      let picData = await generatePicturesData(10);

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
      console.log('Complete seeding 10 million records for Pictures!!');
      console.log('Complete iteration!' + '\n' + 'Press ctrl + c to exit');
    }
  );

};

const insertReviewPhotos = function () {
  db.sequelize.sync({ });
  let count = 0;
  async.whilst(
    () => count < 1,
    async (cb) => {
      count++;
      console.log('Review pic count: ', count);
      let reviewPicData = await generateReviewPhotosData(10);

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
      console.log(`Complete seeding 10 million records for Review Photos!!`);
      console.log('Complete iteration!' + '\n' + 'Press ctrl + c to exit');
    }
  );

};

async function startSeed() {
  await insertPictures();
  await insertReviewPhotos();
}

startSeed();

