Installation
------------

You must install the required packages by running the following command:

        npm i

Using
-----

Now you can use the API by running the following command:

       npm start

You can also run

        npm run dev

Application Path
-----------

        this.paths = {
            auth: "/api/auth",
            categories: "/api/categories",
            products: "/api/products",
            booking: "/api/bookings",
            users: "/api/users",
        };

Router File
-----------

        routes() {
                this.app.use(this.paths.auth, require("../routes/auth"));
                this.app.use(this.paths.categories, require("../routes/categories"));
                this.app.use(this.paths.products, require("../routes/products"));
                this.app.use(this.paths.booking, require("../routes/bookings"));
                this.app.use(this.paths.users, require("../routes/users"));
        }

Release Notes
-------------

### v 0.0.1

Currently on development
