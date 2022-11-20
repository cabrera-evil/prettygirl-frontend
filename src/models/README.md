Models
------------

You must use the following schemas for POST and PUT request:


Bag
-

        user:{
                type: String,
        },
        products:{
                type: Array,
                _id:{
                type:String,
                },
                amount:{
                type:Number,
        }

Booking
-

        description:{
                products:{
                type: Array,
                },
                total:{
                type: Number,
                }
        },
        user: {
                type: String,
        },
        address: {
                type: String,
        },
        delivery: {
                type: Boolean,
        },
        estimatedDelivery: {
                type: Date,
        }

Category
-

        _id: {
                type: String,
        },
        name: {
                type: String,
        },
        picture: {
                public_id: String,
                secure_url: String
        }

Product
-

        name: {
                type: String,
        },
        category: {
                type: String,
        },
        size: {
                type: Array,
        },
        color: {
                type: Array,
        },
        gender: {
                type: String,
        },
        available: {
                type: Boolean,
        },
        amount: {
                type: Number,
        },
        price: {
                type: Number,
        },
        picture: {
                public_id: String,
                secure_url: String
        }

User
-

        name: {
                type: String,
        },
        dui: {
                type: String,
        },
        email: {
                type: String,
        },
        phone: {
                type: String,
        },
        address: {
                type: String,
        },
        password: {
                type: String,
        },
        role: {
                type: String,
        },

Release Notes
-------------

### v 0.0.1

Currently on development
