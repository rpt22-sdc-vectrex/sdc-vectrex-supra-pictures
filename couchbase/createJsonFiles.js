let async = require('async');
const fs = require('fs');
const path = require('path');
const { generatePicturesData } = require('./helpers/generatePicturesData');
let fileCount = 1;
const createJsonFiles = (i) => {
  let count = 1;
  async.whilst(
    () => count <= 25,
    async (cb) => {
      console.log('count: ', count);
      const filepath = path.join(__dirname + `/jsonfiles/pics${fileCount}.json`);
      let writableStream = fs.createWriteStream(filepath);
      let picData = await generatePicturesData(1e5);
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





