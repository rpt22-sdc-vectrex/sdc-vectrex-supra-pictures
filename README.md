# Pictures Module

![sdc (1)](https://user-images.githubusercontent.com/61848395/111083044-bdf1d400-84c8-11eb-99e6-3c6b6ff1dab2.gif)

---

To start server: npm run start

To seed database: npm run seedDB

To bundle files via webpack: npm run prod-build

---


### REST API

```sh
Response codes Used
200: Success
400: Bad request
404: Cannot be found
422: Unprocessable Entity
500: Server Error
```
---

#### Pictures

| Method | CRUD Operation | End point | Actions | Success Msg | Error Msg |
| ------ | ------ | ------ | ------ | ------ | ------ |
| POST | CREATE | /pictures | Add new pictures | Successfully created pictures | Record already exists!!
| GET | READ | /pictures | Get all pictures | Success - All data | Error occurred while retrieving Pictures.
| GET | READ | /pictures/:itemId | Get pictures by id | Success - One data | itemId does not exist in database.
| PUT | UPDATE | /pictures/:itemId | Update pictures by id | Pictures updated successfully | Cannot update Picture with id
| DELETE | DELETE | /pictures | Delete all pictures | totalNo Pictures deleted successfully | Error occurred while removing all pictures
| DELETE | DELETE | /pictures/:itemId | Delete pictures by id | Pictures deleted successfully | Cannot delete Pictures with id

---
#### Review Photos

| Method | CRUD Operation | End point | Actions | Success Msg | Error Msg |
| ------ | ------ | ------ | ------ | ------ | ------ |
| POST | CREATE | /reviewPhotos | Add new Review Photos | Successfully created Review Photos | Record already exists!!
| GET | READ | /reviewPhotos | Get all Review Photos | Success - All data| Error occurred while retrieving Review Photos.
| GET | READ | /reviewPhotos/:itemId | Get Review Photos by id | Success - one data | itemId does not exist in database.
| PUT | UPDATE | /reviewPhotos/:itemId | Update Review Photos by id | Review Photos updated successfully | Cannot update Review Photos with id
| DELETE | DELETE | /reviewPhotos | Delete all Review Photos | totalNo Review Photos deleted successfully | Error occurred while removing all Review Photos
| DELETE | DELETE | /reviewPhotos/:itemId | Delete Review Photos by id | Pictures deleted successfully | Cannot delete Review Photos with id

---
