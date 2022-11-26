const { response } = require("express");
const {uploadFile} = require("../helpers/upload-file");
const Product = require("../models/product");

// Get all products
const productsGet = async (req, res = response) => {
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
    ]);

    res.json({
        total,
        products,
    });
};

// Get the first 5 products
const productsGetByLimit = async (req, res = response) => {
    const { limit = req.params.inputLimit, skip = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .limit(Number(limit))
            .skip(Number(skip))
            .sort({createdAt: -1})
    ]);

    res.json({
        total,
        products
    });
};

// Get products by category
const productsGetByCategory = async (req, res = response) => {
    const { category } = req.params;
    const query = { status: true, category: category };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query),
    ]);

    res.json({
        total,
        products,
    });
};

// Get an specific product
const getProduct = async (req, res = response) => {
    const { id } = req.params;
    const product = await Product.findById(id)

    res.json(product);
};

// Post a new product
const productPost = async (req, res) => {
    const product = new Product(req.body);

    const type = "products";

    // Upload file to cloudinary
    if(req.files?.picture){
        const result = await uploadFile(req.files.picture.tempFilePath, type);
        product.picture = result.url;
    }

    // Validate if the gender is valid to save the product
    if(validateGender(product.gender)){
        await product.save();
        res.json({
            product,
        });
    }
    // Show an error and don't save the product
    else{
        return res.status(400).json({
            msg: "Invalid gender"
        });
    }
};

// Put an existing product
const productPut = async (req, res = response) => {
    const { id } = req.params;
    const newProduct = {...req.body};

    // Validate if the gender is valid to save the product
    if(validateGender(product.gender)){
        const updatedProduct = await Product.findByIdAndUpdate(id, newProduct , {new: true});
        res.json(updatedProduct);
    }
    // Show an error and don't save the product
    else{
        return res.status(400).json({
            msg: "Invalid gender"
        });
    }
};

// Set product status to unavailable
const productDelete = async (req, res = response) => {
    const { id } = req.params;
    const unabledProduct = await Product.findByIdAndUpdate(id, {available: false});

    res.json(unabledProduct);
};

//Helper functions
const validateGender = (gender) =>{
    if(gender == "Masculino" || gender == "Femenino" || gender == "Unisex"){
        return true;
    }
    return false;
}

module.exports = {
    productsGet,
    productsGetByLimit,
    productsGetByCategory,
    getProduct,
    productPost,
    productPut,
    productDelete,
};
