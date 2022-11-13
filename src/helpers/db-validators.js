const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Booking = require("../models/booking");

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`Email: ${email} already exist`);
  }
};

const userExistByID = async (id = "") => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`User ID:${id} does not exist`);
  }
};

const duiExist = async (dui = "") => {
  const duiExist = await User.findOne({ dui });

  if (duiExist) {
    throw new Error(`DUI: ${dui} already exist`);
  }
};

const categoryExistByID = async (id = "") => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) {
    throw new Error(`Category ID:${id} does not exist`);
  }
};

const productExistByID = async (id = "") => {
  const productExist = await Product.findById(id);
  if (!productExist) {
    throw new Error(`Product ID:${id} does not exist`);
  }
};

const bookingExistByID = async (id = "") => {
  const bookingExist = await Booking.findById(id);
  if (!bookingExist) {
    throw new Error(`Booking ID:${id} does not exist`);
  }
};

// Validate collections
const allowedCollections = (collection = "", collections = []) => {
  const included = collections.includes(collection);
  if (!included) {
    throw new Error(`Collection ${collection} not allowed`);
  }
  return true;
};

module.exports = { 
  emailExist,
  userExistByID,
  duiExist,
  categoryExistByID,
  productExistByID,
  bookingExistByID,
  allowedCollections,
};
