const { response } = require("express");
const {uploadFile} = require("../helpers/upload-file");
const Product = require("../models/product");

// Get the first 5 products
const feedProductsGet = async (req, res = response) => {
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
        product.picture = {
            public_id: result.public_id,
            secure_url: result.secure_url
        }
    }
    // Setting the default image if the user doesn't upload a new one
    else{
        product.picture = {
            public_id: "none",
            secure_url: "https://res.cloudinary.com/cabrera-evil/image/upload/v1668401831/prettygirl-api/default/no-image_qtyjtw.jpg"
        }
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
    const type = "products";

    // Upload file to cloudinary
    if(req.files?.picture){
        const result = await uploadFile(req.files.picture.tempFilePath, type);
        newProduct.picture = {
            public_id: result.public_id,
            secure_url: result.secure_url
        }
    }
    // Setting the default image if the user doesn't upload a new one
    else{
        product.picture = {
            public_id: "none",
            secure_url: "https://res.cloudinary.com/cabrera-evil/image/upload/v1668401831/prettygirl-api/default/no-image_qtyjtw.jpg"
        }
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct , {new: true});
    res.json(updatedProduct);
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
    feedProductsGet,
    productsGet,
    getProduct,
    productPost,
    productPut,
    productDelete,
};
