module.exports = app => {
  const reviewPics = require("../controllers/reviewPics.controller");

  var router = require("express").Router();

  // Create a new
  router.post("/", reviewPics.create);

  // Retrieve all
  router.get("/", reviewPics.findAll);

  // Retrieve a single  with id
  router.get("/:itemId", reviewPics.findOne);

  // Update a  with id
  router.put("/:itemId", reviewPics.update);

  // Delete a  with id
  router.delete("/:itemId", reviewPics.delete);

  // Create a new
  router.delete("/", reviewPics.deleteAll);

  app.use("/reviewPhotos", router);
};
