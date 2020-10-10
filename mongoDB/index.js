const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || dbConfig.HOST;

mongoose.connect(`mongodb://${uri}:${dbConfig.port}/${dbConfig.DB}`, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database successfully connected');
});
