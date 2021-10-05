# ExpressCRUD

## Login Endpoints

Login endpoints - require no Authentication.

* [Login](login.md) : `POST /login/`

### Users Endpoints

Each endpoint manipulates or displays information related to the User - require no Authentication.

* [Get users](user/get.md) : `GET /user/`
* [Get an user](user/get.md) : `GET /user/:id/`
* [Create user](user/post.md) : `POST /user/`
* [Update user](user/put.md) : `PUT /user/:id/`
* [Delete user](user/delete.md) : `DELETE /user/:id`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the request as auth. A Token can be acquired from the Login view above.

* [Activate user](user/post.md) : `POST /user/activate/:id`