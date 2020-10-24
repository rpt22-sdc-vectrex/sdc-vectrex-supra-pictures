/* eslint-disable no-console */
/* eslint-disable no-undef */
const supertest = require('supertest');
const { app } = require('../server/index.js');
const { postData, updateData } = require('./testdata');
const request = supertest(app);

describe('Mysql: API Validations', () => {
  /* CREATE */
  it('should be able to create new record', (done) => {
    request.post('/pictures').send(postData)
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({ message: 'Successfully created pictures' });
        done();
      });
  });

  it('should not be able to post for already existing record', (done) => {
    request.post('/pictures').send({ item_id: 10000000 })
      .then((response) => {
        expect(response.statusCode).toEqual(422);
        expect(response.text).toEqual('Record already exists!!');
        done();
      });
  });

  /* GET */
  it('should return an object containing pictures related to itemId', (done) => {
    request.get('/pictures/10000000')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.item_id).toEqual(10000000);
        expect(response.body).toHaveProperty('item_id');
        expect(response.body).toHaveProperty('item_pictures');
        expect(response.body).toHaveProperty('seller_picture');
        expect(response.body).toHaveProperty('store_picture');
        expect(response.body.item_pictures.length).toBe(8);
        expect(response.body.item_pictures).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              large: 'https://sdc-vectrex-pictures.s3-us-west-1.amazonaws.com/sdcpic314.jpg'
            })
          ])
        );
        done();
      })
  });

  it('should return an error when itemId does not exist', (done) => {
    request.get('/pictures/:30000000')
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'itemId: :30000000 does not exist in database.' });
        done();
      });
  });

  /* UPDATE */
  it('should be able to update an existing record', (done) => {
    request.put('/pictures/10000004').send(updateData)
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.status).toBe(202);
        expect(response.body).toEqual({ message: 'Pictures updated successfully.' });
        done();
      });
  });

  it('should not be able to update a non-existing record', (done) => {
    request.put('/pictures/100000010')
      .then((response) => {
        expect(response.statusCode).toEqual(500);
        expect(response.body).toEqual({ message: 'Error updating Pictures with id=100000010' });
        done();
      });
  });

  /* DELETE */
  it('should be able to delete a record', (done) => {
    // match the item_id in postData.
    request.delete('/pictures/10000004')
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message: 'Pictures deleted successfully!' });
        done();
      });
  });

  it('should not be able to delete a non-existing record', (done) => {
    request.post('/pictures/10000004')
      .then((response) => {
        expect(response.statusCode).toEqual(404);
        done();
      });
  });

});
