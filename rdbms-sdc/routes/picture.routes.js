module.exports = app => {
  const pictures = require("../controllers/pictures.controller.js");
  const cache = require("../../cache");

  var router = require("express").Router();

  // Create
  router.post("/", pictures.create);

  // Retrieve all
  router.get("/", cache(600), pictures.findAll);

  // Retrieve single
  router.get("/:itemId", cache(600), pictures.findOne);

  // Update by id
  router.put("/:itemId", pictures.update);

  // Delete by id
  router.delete("/:itemId", pictures.delete);

  // Delete all
  router.delete("/", pictures.deleteAll);

  app.use("/pictures", router);
};
