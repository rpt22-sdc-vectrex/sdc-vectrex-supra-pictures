module.exports = app => {
  const pictures = require("../controllers/pictures.controller.js");

  var router = require("express").Router();

  // Create
  router.post("/", pictures.create);

  // Retrieve all
  router.get("/", pictures.findAll);

  // Retrieve single
  router.get("/:itemId", pictures.findOne);

  // Update by id
  router.put("/:itemId", pictures.update);

  // Delete by id
  router.delete("/:itemId", pictures.delete);

  // Delete all
  router.delete("/", pictures.deleteAll);

  app.use("/pictures", router);
};
