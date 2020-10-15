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
    const items  = pictures.rows.slice(0, 20);
    return items;
  });
});

app.get('/:itemId', async (req, res) => {
  await makeResponse(res, async () => {
    const picture = await PicturesModel.findByItemId({ item_id: Number(req.params.itemId) });
    const item = picture.rows[0];
    if (!item) {
      return { message: `${req.params.itemId} does not exist in database.` };
    }
    return item;
  });
});

app.post('/', async (req, res) => {
  PicturesModel.findByItemId({ item_id: Number(req.body.item_id) })
  .then((result) => {
    if (result.rows.length) {
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
  console.log('put:')
  PicturesModel.findByItemId({ item_id: Number(req.params.itemId) })
  .then((result) => {
    console.log('put res:', result.rows)
    if (result.rows.length) {
      makeResponse(res, async () => {
        await PicturesModel.replace(req.body, result.rows[0].id);
        return { message: 'Picture updated successfully '};
      });
    } else {
      makeResponse(res, async () => {
        return {
          message: `Cannot update Pictures with id=${req.params.itemId}!`
        };
      });
    }
  })
  .catch(err => {
    makeResponse(res, async () => {
      return {
        message:
          err.message || "Error occurred while updating the picture."
      };
    });

  });;
});

app.delete('/:itemId', async (req, res) => {
  console.log('del:')
  PicturesModel.findByItemId({ item_id: Number(req.params.itemId) })
  .then((result) => {
    console.log('del result:')
    if (result.rows.length) {
      console.log('result.rows.length:')
      makeResponse(res, async () => {
        console.log('result.rows[0].id', result.rows)
        await PicturesModel.remove(result.rows[0].item_id);
        return {
          message: "Picture deleted successfully!"
        };
      });
    } else {
      makeResponse(res, async () => {
        return {
          message: `Cannot delete Pictures with id=${req.params.itemId}!`
        };
      });

    }
  })
  .catch(err => {
    makeResponse(res, async () => {
      return {
        message:
          err.message || "Error occurred while removing the picture."
      };
    });
  });;
});

module.exports = {
    PicturesRoutes: app
}
