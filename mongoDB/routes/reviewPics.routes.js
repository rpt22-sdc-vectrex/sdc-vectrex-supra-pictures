module.exports = app => {
  const reviewPics = require("../controllers/reviewPics.controller");

  var router = require("express").Router();

  // Create
  router.post("/", reviewPics.create);

  // Retrieve all
  router.get("/", reviewPics.findAll);

  // Retrieve single
  router.get("/:itemId", reviewPics.findOne);

  // Update by id
  router.put("/:itemId", reviewPics.update);

  // Delete by id
  router.delete("/:itemId", reviewPics.delete);

  // Delete all
  router.delete("/", reviewPics.deleteAll);

  app.use("/reviewPhotos", router);
};
