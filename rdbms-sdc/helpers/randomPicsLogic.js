const faker = require('faker');

const randomPicsLogic = () => {
  let randomPictureItemsLength = faker.random.number({ min: 1, max: 10 });
  let randomPics = [];

  while (randomPics.length < randomPictureItemsLength) {
    let picId = faker.random.number({ min: 1, max: 1000 });
    randomPics.push({
      "large": `https://sdc-vectrex-pictures.s3-us-west-1.amazonaws.com/sdcpic${picId}.jpg`,
      "normal": `https://sdc-vectrex-pictures.s3-us-west-1.amazonaws.com/sdcpic${picId}.jpg`,
      "thumbnail": `https://sdc-vectrex-pictures.s3-us-west-1.amazonaws.com/sdcpic${picId}.jpg`
    });
  }

  return randomPics;
};

module.exports = { randomPicsLogic };
