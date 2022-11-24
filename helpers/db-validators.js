const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Booking = require("../models/booking");
const Bag = require("../models/bag")

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

const categoryExistByID = async (name = "") => {
  const categoryExist = await Category.findOne({name});
  if (!categoryExist) {
    throw new Error(`Category:${name} does not exist`);
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

const bagExistByID = async (id = "") => {
  const bagExist = await Bag.findById(id);
  if (!bagExist) {
    throw new Error(`Bag ID:${id} does not exist`);
  }
};

const bagExistByUser = async (id = "") => {
  const bagExist = await Bag.find({user: id,});
  if (!bagExist) {
    throw new Error(`Bag User ID:${id} does not exist`);
  }
};

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
  categoryExistByID,
  productExistByID,
  bookingExistByID,
  bagExistByID,
  bagExistByUser,
  allowedCollections,
};
