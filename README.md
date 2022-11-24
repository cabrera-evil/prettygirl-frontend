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

        app.use('/', indexRouter);
        app.use('/api/auth', authRouter);
        app.use('/api/bags', bagsRouter);
        app.use('/api/bookings', bookingRouter);
        app.use('/api/categories', categoryRouter);
        app.use('/api/products', productRouter);
        app.use('/api/users', usersRouter);

Router File
-----------

        var indexRouter = require('./routes/index');
        var authRouter = require('./routes/auth');
        var bagsRouter = require('./routes/bags');
        var bookingRouter = require('./routes/bookings');
        var categoryRouter = require('./routes/categories');
        var productRouter = require('./routes/products');
        var usersRouter = require('./routes/users');

Release Notes
-------------

### v 0.0.1

Currently on development
