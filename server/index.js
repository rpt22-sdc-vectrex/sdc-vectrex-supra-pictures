require('newrelic');
const compression = require('compression');
const expressStaticGzip = require("express-static-gzip");
const responseTime = require('response-time');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(compression());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseTime());

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(expressStaticGzip(`${__dirname}/../public`));

app.use(express.static(`${__dirname}/../public`));

/* Mongo Routes */
// require('../mongoDB/routes/picture.routes')(app);
// require('../mongoDB/routes/reviewPics.routes')(app);

/* MySql || postgres Routes */
require('../rdbms-sdc');
require('../rdbms-sdc/routes/picture.routes')(app);

/* Couchbase Routes */
// require('../couchbase');
// const { PicturesRoutes } = require('../couchbase/pictures/pictures.controller');
// app.use('/pictures', PicturesRoutes);


module.exports.app = app;