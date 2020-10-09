// const dbConfig = require('./config/pg.config');
const dbConfig = require('./config/sql.config');
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

/*  To use Postgres */
/* const { Client } = require('pg');
const connectionString = `postgres://${dbConfig.USER}@${dbConfig.HOST}:${dbConfig.port}/${dbConfig.DB}`;
const client = new Client({
  connectionString: connectionString
})
client
  .connect()
  .then(() => console.log('*** postgres database created successfully ***'))
  .catch(err => console.error('connection error', err.stack)) */


/*  To use mysql */
mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.port,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
})
  .then(connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB};`);
  })
  .then(() => {
    console.log('*** Mysql database created successfully ***');
  });

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.queryInterface = sequelize.getQueryInterface();

db.pictures = require('./models/pictures.model')(sequelize, Sequelize);
db.reviewPhotos = require('./models/reviewPics.model')(sequelize, Sequelize);

db.sequelize.sync({});

module.exports = db;
