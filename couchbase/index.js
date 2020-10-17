const dbConfig = require('./config/db.config');
const ottoman = require('ottoman');

ottoman.globalConfig({
    collectionKey: 'type',
    disableScopes: true
});

ottoman.connect({
    bucketName: dbConfig.BUCKET,
    connectionString: `couchbase://${dbConfig.HOST}:${dbConfig.port}`,
    username: `${dbConfig.USER}`,
    password: `${dbConfig.PASSWORD}`
})

// commenting out for tests
/* ottoman.ensureIndexes().then(() => {
  console.log('Indexes are registered');
})
.catch(err => console.log(err)); */