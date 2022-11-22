Requests
------------

You must use the following routes for every request:


Auth
-

        POST /auth/login
        GET /auth/validate/:token

Bag
-

        GET /bags
        GET /bags/:user_id
        GET /bags/products/:bag_id
        POST /bags
        PUT /bags/:bag_id
        DELETE /bags/:bag_id

Booking
-

        GET /bookings
        GET /bookings/:id
        POST /bookings
        PUT /bookings/:id
        DELETE /bookings/:id

Category
-

        GET /categories
        GET /categories/:id
        POST /categories
        PUT /categories/:id
        DELETE /categories/:id

Product
-

        GET /products
        GET /products/feed
        GET /products/:id
        POST /products
        PUT /products/:id
        DELETE /products/:id

User
-

        GET /users
        GET /users/:id
        POST /users
        PUT /users/:id
        DELETE /users/:id

Release Notes
-------------

### v 0.0.1

Currently on development
