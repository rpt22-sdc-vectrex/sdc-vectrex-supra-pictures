const { ReviewPhotos } = require("../models/reviewPics.model");

// Create and Save a new picture
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  ReviewPhotos.findOne({ where: { id: req.body.id }})
    .then(data => {
      if (data) {
        res.status(422).send('Record already exists!!');
      } else {
        ReviewPhotos.create(req.body)
          .then(data => {
            res.status(201).send({ message: "Successfully created Review Photos" });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Error occurred while creating the Review Photos."
            });
          });
      }
    })
};

// Retrieve all pictures
exports.findAll = (req, res) => {
  ReviewPhotos.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving Review Photos."
      });
    });
};

// Find picture with an id
exports.findOne = (req, res) => {
  const itemId = req.params.itemId;
  ReviewPhotos.findOne({ where: { id: itemId }})
    .then(data => {
      if (!data) {
        res.status(404).send({ error: `itemId: ${itemId} does not exist in database.` });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Error retrieving Review Photos by id' });
    });
};

// Update Pictures by the id in the request
exports.update = (req, res) => {
  const itemId = req.params.itemId;
  ReviewPhotos.update(req.body, { where: { id: itemId } })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Review Photos with id=${itemId}!`
        });
      } else res.status(202).send({ message: "Review Photos updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Review Photos with id=" + itemId
      });
    });
};

// Delete Pictures
exports.delete = (req, res) => {
  const itemId = req.params.itemId;
  ReviewPhotos.destroy({
    where: { id: itemId }
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Review Photos with id=${itemId}!`
        });
      } else {
        res.send({
          message: "Review Photos deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Review Photos" });
    });
};

// Delete all Pictures from the database.
exports.deleteAll = (req, res) => {
  ReviewPhotos.destroy({
    where: {},
    truncate: false
  })
    .then(data => {
      res.send({
        message: `${data.deletedCount} Review Photos deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while removing all Review Photos."
      });
    });
};
