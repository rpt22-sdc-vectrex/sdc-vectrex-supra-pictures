const db = require('../index');
const Pictures = db.pictures;
const Op = db.Sequelize.Op;

// Create and Save a new picture
exports.create = (req, res) => {
  // Validate request
  if (!req.body.item_id) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Pictures.findOne({ where: { item_id: req.body.item_id }})
    .then(data => {
      if (data) {
        res.status(422).send('Record already exists!!');
      } else {
        Pictures.create(req.body)
          .then(data => {
            res.status(201).send({ message: "Successfully created pictures" });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Error occurred while creating the pictures."
            });
          });
      }
    })
};

// Retrieve all pictures
exports.findAll = (req, res) => {
    Pictures.findAll({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving Pictures."
      });
    });
};

// Find picture with an id
exports.findOne = (req, res) => {
  const itemId = req.params.itemId;
  console.log('itemID', itemId)
    Pictures.findOne({ where: { item_id: itemId }})
    .then(data => {
      if (!data) {
        res.status(404).send({ error: `itemId: ${itemId} does not exist in database.` });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      console.log('ERR:', err)
      res.status(500).send({ message: 'Error retrieving pictures by id' });
    });
};

// Update Pictures by the id in the request
exports.update = (req, res) => {
  const itemId = req.params.itemId;

  Pictures.update(req.body, { where: { item_id: itemId } })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Pictures with id=${itemId}!`
        });
      } else {
        res.status(202).send({ message: "Pictures updated successfully." });
      }
    })
    .catch(err => {
      console.log('ERR:', err)
      res.status(500).send({
        message: "Error updating Pictures with id=" + itemId
      });
    });
};

// Delete Pictures
exports.delete = (req, res) => {
  const itemId = req.params.itemId;
  Pictures.destroy({
    where: { item_id: itemId }
  })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Pictures with id=${itemId}!`
        });
      } else {
        res.send({
          message: "Pictures deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Pictures" });
    });
};

// Delete all Pictures from the database.
exports.deleteAll = (req, res) => {
  Pictures.destroy({
    where: {},
    truncate: false
  })
    .then(data => {
      res.send({
        message: `${data.deletedCount} Pictures deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while removing all Pictures."
      });
    });
};
