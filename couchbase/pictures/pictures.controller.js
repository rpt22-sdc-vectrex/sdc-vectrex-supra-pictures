const express = require('express');
const app = express();
const { ValidationError } = require('ottoman');
const { PicturesModel } = require('./pictures.model');

async function makeResponse(res, action) {
  try {
    const result = await action();
    res.json(result);
  } catch (e) {
    console.log(e);
    const status = e.message !== undefined && e.message.indexOf('not found') !== -1 ? 404 : 500;
    res.status(e instanceof ValidationError ? 400 : status);
    res.json({ message: e.message });
  }
};

app.get('/', async (req, res) => {
  await makeResponse(res, async () => {
    const pictures = await PicturesModel.find({});
    const items  = pictures.rows;
    return items;
  });
});

app.get('/:itemId', async (req, res) => {
  await makeResponse(res, async () => {
    const picture = await PicturesModel.findByItemId({ item_id: Number(req.params.itemId) });
    const item = picture.rows[0];
    console.log('get item', item);
    if (!item) {
      return { message: `${itemId} does not exist in database.` };
    }
    return item;
  });
});

app.post('/', async (req, res) => {
  PicturesModel.findByItemId({ item_id: Number(req.body.item_id) })
  .then((result) => {
    if (result.rows.length) {
      console.log(result, 'post')
      res.send({ message: 'Record already exists!! '});
    } else {
       makeResponse(res, () => {
        res.status(201);
        const pictures = new PicturesModel(req.body);
        pictures.save();
        return { message: 'Successfully created the pictures' };;
      });
    }
  })

});

app.put('/:itemId', async (req, res) => {
  PicturesModel.findByItemId({ item_id: Number(req.params.itemId) })
  .then((result) => {
    if (result.rows.length) {
      makeResponse(res, async () => {
        await PicturesModel.replace(req.body, result.rows[0].id);
        return { message: 'Picture updated successfully '};
      });
    } else {
      return {
        message: `Cannot update Pictures with id=${req.params.itemId}!`
      };
    }
  })
  .catch(err => {
    return {
      message:
        err.message || "Error occurred while updating the picture."
    };
  });;
});

app.delete('/:itemId', async (req, res) => {
  PicturesModel.findByItemId({ item_id: Number(req.params.itemId) })
  .then((result) => {
    if (result.rows.length) {
      console.log(result, 'del');
      makeResponse(res, async () => {
        await PicturesModel.remove(result.rows[0].id);
        return {
          message: "Picture deleted successfully!"
        };
      });
    } else {
      return {
        message: `Cannot delete Pictures with id=${req.params.itemId}!`
      };
    }
  })
  .catch(err => {
    return {
      message:
        err.message || "Error occurred while removing the picture."
    };
  });;
});

module.exports = {
    PicturesRoutes: app
}
