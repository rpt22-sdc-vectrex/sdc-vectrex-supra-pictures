const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../public`));


/* Mongo Routes */
// require('../mongoDB/routes/picture.routes')(app);
// require('../mongoDB/routes/reviewPics.routes')(app);

/* MySql || postgres Routes */
// require('../rdbms-sdc/index');
// require('../rdbms-sdc');
// require('../rdbms-sdc/routes/picture.routes')(app);

/* Couchbase Routes */
require('../couchbase');
const { PicturesRoutes } = require('../couchbase/pictures/pictures.controller');
app.use('/pictures', PicturesRoutes);


module.exports.app = app;