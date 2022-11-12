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
    const { name, category, size, color, gender, available, amount, price, picture } = req.body;
    const product = new Product({name, category, size, color, gender, available, amount, price, picture});

    // Saving in db
    await product.save();

    res.json({
        product,
    });
};

// Update category
const productPut = async (req, res = response) => {
    const { id } = req.params;
    const { name, category, size, color, gender, available, amount, price, picture, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
    });

    res.json(product);
};

//  Delete category - status:false
const productDelete = async (req, res = response) => {
    const { id } = req.params;

    const productDeleted = await Product.findByIdAndUpdate(
        id,
        { status: false },
        {
            new: true,
        }
    );

    res.json(productDeleted);
};

module.exports = {
    productsGet,
    getProduct,
    productPost,
    productPut,
    productDelete,
};
