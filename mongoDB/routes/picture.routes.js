module.exports = app => {
  const pictures = require("../controllers/pictures.controller.js");

  var router = require("express").Router();

  // Create a new
  router.post("/", pictures.create);

  // Retrieve all
  router.get("/", pictures.findAll);

  // Retrieve a single  with id
  router.get("/:itemId", pictures.findOne);

  // Update a  with id
  router.put("/:itemId", pictures.update);

  // Delete a  with id
  router.delete("/:itemId", pictures.delete);

  // Create a new
  router.delete("/", pictures.deleteAll);

  app.use("/pictures", router);
};
