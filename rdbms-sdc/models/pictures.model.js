module.exports = (sequelize, Sequelize) => {
  const { INTEGER, TEXT } = Sequelize;
  const Pictures = sequelize.define('pictures', {
    item_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    item_pictures: {
      type: TEXT,
      get: function() {
        return JSON.parse(this.getDataValue('item_pictures'));
      },
      set: function(val) {
        return this.setDataValue('item_pictures', JSON.stringify(val));
      },
      allowNull: false
    },
    seller_picture: {
      type: TEXT,
      allowNull: false
    },
    store_picture: {
      type: TEXT,
      allowNull: false
    }
  },
  {tableName: 'pictures'});

  return Pictures;
};