# Elvis API challenge
Simple API to manage a small store. You can find me [here!](https://elvis-api.herokuapp.com)

# Why?
This challenge is designed to put your NodeJS skills to the test by creating a **Rest API** to manage a small snacks store called Elvis.

### Installation

Elvis API requires [Node.js](https://nodejs.org/) v8.2.1 to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd elvis-api
$ npm install -d
```

Since we're using nodemon for development, we start the project with

```sh
$ nodemon
```

### API
Elvis APi enables the following endpoints:

#### public

* POST /api/users - Allow us to create a new user.
    request:
    ```javascript
    {
      "email": "john@yopmail.com",
      "first_name": "John",
      "last_name":"Doe",
      "password": "welcome123"
    }
    ```
    
    response:
    ```javascript
    {
        "_id":"59900cbb48b07210f447695b",
        "email":"rafael4@yopmail.com",
        "first_name":"John",
        "last_name":"Doe",
        "created_at":"2017-08-13T08:24:27.272Z",
        "role":["client"]
    }
    ```
* GET /api/products?q=value%sort_by=popularity - Returns a sorted list of products. By default is sorted by name but it's possible to sort it by popularity. Also you can filter the list by providing a 'value' param.
    ```javascript
    [
        {
            "_id": "59922fc33cc00a2892ebfa37",
            "stock": 225,
            "price": 352,
            "name": "testing z",
            "created_at": "2017-08-14T23:18:27.925Z",
            "likes": 15
        },
        {
            "_id": "59922b86496f782042c53d73",
            "stock": 10,
            "price": 35,
            "name": "testing y",
            "created_at": "2017-08-14T23:00:22.551Z",
            "likes": 0
        }
    ]
    ```
    
* GET /api/products/:id - Returns a product.
    ```javascript
    {
        "_id": "599224d308c0ff118f404f4f",
        "stock": 10,
        "price": 35,
        "name": "testing x",
        "created_at": "2017-08-14T22:31:47.031Z",
        "likes": 5
    }
    ```

In order to access these endpoints, you need to provide a json web token. To get one we are going to use:

* POST /api/auth/token - Allow us to generate a new jwt. The expiration time is 2 hours. Also by default the token is created with a 'client' scope unless we specify an 'admin' scope.
    request:
    ```javascript
    {
        "email": "rafael@yopmail.com",
        "password": "welcome123",
        "scope": "admin"
    }
    ```

    response:
    ```javascript
    {
        "token": "eyJhbGciOiJIUzIVCJ9.ey1MDI4MjA4OTB9.V3jlZqsMgcHYud9MRuYOrVrXZ6rAeSJwj87G_V6r7Es"
    }
    ```
    
#### protected

###### admin
* POST /api/products - Allow us to create a product. Price is given in cents.
    request:
    ```javascript
    {
      "stock": 20,
      "price": 35,
      "name": "Aperture Science"
    }
    ```
    
    response:
    ```javascript
    {
        "_id": "599224d308c0ff118f404f4f",
        "stock": 20,
        "price": 35,
        "name": "Aperture Science",
        "created_at": "2017-08-14T22:31:47.031Z",
        "likes": 5
    }
    ```
* PUT /api/products/:id - Allow us to update a product.
    request:
    ```javascript
    {
      "price": 45,
    }
    ```
    
    response:
    ```javascript
    {
        "_id": "599224d308c0ff118f404f4f",
        "stock": 10,
        "price": 45,
        "name": "testing x",
        "created_at": "2017-08-14T22:31:47.031Z",
        "likes": 5
    }
    ```

* DELETE /api/products/:id - Delete a product.

###### client

* GET /api/users/me - Returns current user.
    response:
    ```javascript
    {
        "_id":"59900cbb48b07210f447695b",
        "email":"rafael4@yopmail.com",
        "first_name":"John",
        "last_name":"Doe",
        "created_at":"2017-08-13T08:24:27.272Z",
        "role":["client"]
    }
    ```

* PUT /api/users/me - Allow us to update current user.
    request:
    ```javascript
    {
      "email": "john@yopmail.com",
      "first_name": "John"
      "last_name":"Doe"
    }
    ```
    
    response:
    ```javascript
    {
        "_id":"59900cbb48b07210f447695b",
        "email":"john@yopmail.com",
        "first_name":"John",
        "last_name":"Doe",
        "created_at":"2017-08-13T08:24:27.272Z",
        "role":["client"]
    }
    ```

* POST /api/products/:id/like - Allow us to give like to a product.
* DELETE /api/products/:id/dislike - Allow us to give dislike to a product

* POST /api/products/:id/buy - Allow us to buy a product.
    request
    ```javascript
    {
      "quantity": 2,
      "pay_type": "check"
    }
    ```
    response:
    ```javascript
    {
        "_buyer": "59900cbb48b07210f447695b",
        "_product": "5992162e84a8e576c5e8d17e",
        "unit_price": 35,
        "quantity": 2,
        "total": 70,
        "_id": "599221e62dfd7c0fa7eafc33",
        "created_at": "2017-08-14T22:19:18.851Z",
        "pay_type":[
            "check"
        ]
    }
    ```

## Dependencies

- [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware
- [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework
- [express-jwt](https://github.com/auth0/express-jwt): JWT authentication middleware.
- [express-jwt-permissions](https://github.com/MichielDeMey/express-jwt-permissions): Express middleware for JWT permissions
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): JSON Web Token implementation (symmetric and asymmetric)
- [mongoose](https://github.com/Automattic/mongoose): Mongoose MongoDB ODM
- [morgan](https://github.com/expressjs/morgan): HTTP request logger middleware for node.js

## Dev Dependencies

- [nodemon](https://github.com/remy/nodemon): Simple monitor script for use during development of a node.js app.

### Todos

 - Write Tests
 - Enable refresh tokens
 - Improve search feature
 - Enable an endpoint to return products logs.
 - Enable an endpoint to return orders list.
 
License
----

ISC


