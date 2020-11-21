const NodeCache = require("node-cache");
const cache = new NodeCache();

module.exports = (duration) => (req, res, next) => {
  if (req.method !== "GET") {
    console.log("Non-GET methods are not supported");
    return next();
  }
  const key = req.originalUrl;
  const cachedResp = cache.get(key);

  if (cachedResp) {
    res.send(cachedResp);
  } else {
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};