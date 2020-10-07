/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'localhost';

mongoose.connect(`mongodb://${uri}:27017/picturesSDC1`, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database successfully connected');
});
