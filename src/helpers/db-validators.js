const User = require("../models/user");
const Category = require("../models/category");
const Product = require("../models/product");
const Booking = require("../models/booking");

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`El email: ${email} ya esta registrado`);
  }
};

const userExistByID = async (id = "") => {
  const userExist = await User.findById(id);
  if (!userExist) {
    throw new Error(`El usuario con ID:${id} no existe`);
  }
};

const duiExist = async (dui = "") => {
  const duiExist = await User.findOne({ dui });

  if (duiExist) {
    throw new Error(`El dui: ${dui} ya esta registrado`);
  }
};

const categoryExistByID = async (id = "") => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) {
    throw new Error(`La categoria con ID:${id} no existe`);
  }
};

const productExistByID = async (id = "") => {
  const productExist = await Product.findById(id);
  if (!productExist) {
    throw new Error(`El producto con ID:${id} no existe`);
  }
};

const bookingExistByID = async (id = "") => {
  const bookingExist = await booking.findById(id);
  if (!bookingExist) {
    throw new Error(`La reserva con ID:${id} no existe`);
  }
};

// Validate collections
const allowedCollections = (collection = "", collections = []) => {
  const included = collections.includes(collection);
  if (!included) {
    throw new Error(`La coleccion ${collection} no esta permitida`);
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
