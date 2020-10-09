module.exports = (sequelize, Sequelize) => {
  const { INTEGER, TEXT } = Sequelize;
  const ReviewPhotos = sequelize.define('reviewphotos', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_picture: {
      type: TEXT(),
      allowNull: false
    },
    review_picture: {
      type: TEXT(),
      allowNull: false
    }
  },
  {tableName: 'reviewphotos'});

  return ReviewPhotos;
};