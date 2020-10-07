const faker = require('faker');

const randomPicsLogic = () => {
  let randomPictureItemsLength = faker.random.number({ min: 1, max: 20 });

    let randomPics = [];

    while (randomPics.length < randomPictureItemsLength) {
      randomPics.push({
        "large":"https://picsum.photos/750/1000",
        "normal":"https://picsum.photos/340/270",
        "thumbnail":"https://picsum.photos/75/75"
      });
    }

    return randomPics;
};

module.exports = { randomPicsLogic };
