const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Booking = require("../models/booking");

const allowedCollections = ["products", "categories", "users", "roles"];

const searchUsers = async (term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term); // true

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({ results: user ? [user] : [] });
    }

    const regex = new RegExp(term, "i");

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }],
    });

    return res.json({ results: users });
};

const searchProducts = async (term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term); // true

    if (isMongoID) {
        const product = await Product.findById(term).populate("category", "name");
        return res.json({ results: product ? [product] : [] });
    }

    const regex = new RegExp(term, "i");

    const products = await Product.find({
        $or: [{ name: regex }],
        $and: [{ status: true }],
    }).populate("category", "name");

    return res.json({ results: products });
};

const searchCategories = async (term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term); // true

    if (isMongoID) {
        const category = await Category.findById(term);
        return res.json({ results: category ? [category] : [] });
    }

    const regex = new RegExp(term, "i");

    const categories = await Category.find({
        $or: [{ name: regex, status: true }],
    });

    return res.json({ results: categories });
};

const search = (req, res = response) => {
    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Allowed collections: ${allowedCollections}`,
        });
    }

    switch (collection) {
        case "users":
            searchUsers(term, res);
            break;
        case "products":
            searchProducts(term, res);
            break;
        case "categories":
            searchCategories(term, res);
            break;
        case "booking":
            searchBooking(term, res);
            break;
        default:
            res.status(500).json({
                msg: "Search error",
            });
    }
};

const searchBooking = async (term = "", res = response) => {
    const isMongoID = ObjectId.isValid(term); // true

    if (isMongoID) {
        const booking = await Booking.findById(term).populate("category", "name");
        return res.json({ results: booking ? [booking] : [] });
    }

    const regex = new RegExp(term, "i");

    const booking = await Booking.find({
        $or: [{ name: regex }],
        $and: [{ status: true }],
    }).populate("category", "name");

    return res.json({ results: booking });
};

module.exports = {
    search,
};
