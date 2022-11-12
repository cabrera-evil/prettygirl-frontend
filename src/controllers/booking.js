const { response, request } = require("express");

const Booking = require("../models/booking");

const bookingGet = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [total, Booking] = await Promise.all([
        Booking.countDocuments(query),
        Booking.find(query).limit(Number(limit)).skip(Number(skip)),
    ]);

    res.json({
        total,
        bookings,
    });
};

const bookingPost = async (req, res) => {
    const {user, address, delivery, date, estimatedDelivery} = req.body;
    const booking = new Booking({user, address, delivery, date, estimatedDelivery});

    // Save in db
    await booking.save();

    res.json({
        booking,
    });
};

const bookingPut = async (req, res) => {
    const { id } = req.params;
    const { user, address, delivery, date, estimatedDelivery, ...info } = req.body;

    const BookingDB = await Booking.findByIdAndUpdate(id, info);

    res.json(BookingDB);
};

const bookingDelete = async (req, res = response) => {
    const { id } = req.params;

    const BookingDB = await Booking.findByIdAndDelete(id);

    res.json({
        BookingDB,
    });
};

module.exports = {
    bookingGet,
    bookingPost,
    bookingPut,
    bookingDelete,
};
