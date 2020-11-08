const { app } = require('./index.js');

const port =  3000;

app.listen(port, () => {
  console.log(`Pictures server listening on port ${port}`);
});
