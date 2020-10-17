let async = require('async');
require('./');
const { PicturesModel } = require('./pictures/pictures.model')
const { generatePicturesData } = require('./helpers/generatePicturesData');

const insertPictures = function () {

  let count = 0;
  async.whilst(
    () => count < 1e2,
    async (cb) => {
      count++;
      console.log('Pic count: ', count);
      let picData = await generatePicturesData();
      PicturesModel.create(picData);
      cb();
    },
    () => {
      console.log('Complete seeding 100 records for Pictures!!');
      console.log('Complete iteration!' + '\n' + 'Press ctrl + c to exit');
    }
  );

};

async function startSeed() {
  await insertPictures();
}

startSeed();




