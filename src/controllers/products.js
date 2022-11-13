const { response } = require("express");
const { body } = require("express-validator");
const Product = require("../models/product");

// Get products - paginate - total - populate
const productsGet = async (req, res = response) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query).limit(Number(limit)).skip(Number(skip)),
    ]);

    res.json({
        total,
        products,
    });
};

// Get product - populate {}
const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate("user", "name")
        .populate("category", "name");

    res.json(product);
};

const productPost = async (req, res) => {
    const data = {...req.body};
    const product = new Product(data);

    // Save in db
    await product.save();

    res.json({
        product,
    });
};

// Update category
const productPut = async (req, res = response) => {
    const { id } = req.params;
    const newProduct = {...req.body};

    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct , {new: true});

    res.json(updatedProduct);
};

//  Delete category - status:false
const productDelete = async (req, res = response) => {
    const { id } = req.params;

    const productDB = await Product.findByIdAndDelete(id);

    res.json(productDB);
};

module.exports = {
    productsGet,
    getProduct,
    productPost,
    productPut,
    productDelete,
};
