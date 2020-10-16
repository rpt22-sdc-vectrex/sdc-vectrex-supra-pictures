/* eslint-disable no-console */
/* eslint-disable no-undef */
require("regenerator-runtime");
const supertest = require('supertest');
const { app } = require('../server/index.js');
const { postData, updateData } = require('./testdata');
const request = supertest(app);

describe('Couch base: API Validations', () => {
  /* CREATE */
  it('should be able to create new record', (done) => {
    request.post('/pictures').send(postData)
      .then((response) => {
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({ message: 'Successfully created the pictures' });
        done();
      });
  });

  it('should not be able to post for already existing record', (done) => {
    request.post('/pictures').send({ item_id: 10000000 })
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message: 'Record already exists!! ' });
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
        expect(response.body.item_pictures.length).toBe(4);
        expect(response.body.item_pictures).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              large: 'https://sdc-vectrex-pictures.s3-us-west-1.amazonaws.com/sdcpic972.jpg'
            })
          ])
        );
        done();
      })
  });

  it('should return an error when itemId does not exist', (done) => {
    request.get('/pictures/:30000000')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: ':30000000 does not exist in database.' });
        done();
      });
  });

  /* UPDATE */
  it('should be able to update an existing record', (done) => {
    // match the item_id in postData.
    request.get('/pictures/10000004')
      .then((response) => {
        expect(response.body).toEqual(postData);
        expect(response.body.item_pictures.length).toBe(1);
        expect(response.body.item_pictures[0].normal).toBe('https://sdc-vectrex-pictures.s3-us-west-1.amazonaws.com/sdcpic73.jpg');
      })
      .then(() => {
        request.put('/pictures/10000004').send(updateData)
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Picture updated successfully ' });
            done();
          })
          .then(() => {
            request.get('/pictures/10000004')
              .then((response) => {
                expect(response.body).toEqual(updateData);
                expect(response.status).toBe(200);
                expect(response.body.item_pictures.length).toBe(2);
                expect(response.body.item_pictures[1].normal).toBe('https://sdc-vectrex-pictures.s3-us-west-1.amazonaws.com/sdcpic75.jpg');
              });
          });
      });
  });

  it('should not be able to update a non-existing record', (done) => {
    request.put('/pictures/100000010')
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message:'Cannot update Pictures with id=100000010!' });
        done();
      });
  });

  /* DELETE */
  it('should be able to delete a record', (done) => {
    // match the item_id in postData.
    request.delete('/pictures/10000004')
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message: 'Picture deleted successfully!' });
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
