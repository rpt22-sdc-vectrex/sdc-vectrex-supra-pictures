let async = require('async');
const fs = require('fs');
const { generatePicturesData } = require('./helpers/generatePicturesData');
let fileCount = 1;
const createJsonFiles = (i) => {
  let count = 1;
  async.whilst(
    () => count <= 25,
    async (cb) => {
      console.log('count: ', count);
      let writableStream = fs.createWriteStream(`./jsonfiles1/pics${fileCount}.json`);
      let picData = await generatePicturesData(10);
      const jsonString = await JSON.stringify(picData);
      writableStream.write(jsonString);
      count++;
      fileCount++;
      await cb();
    },
    () => {
      console.log(`Cycle ${i}:- Complete executing createJsonFiles function`);
    }
  );
};

let gen100files = () => {
  let i;
  for (i = 1; i < 5; i++) {
    (async (i) => {
      setTimeout(() => {
        createJsonFiles(i);
        console.log(`Cycle ${i}:- Creating 25 files of 100k records each`);
      }, 3000);
    })(i)
  }
}

gen100files();





