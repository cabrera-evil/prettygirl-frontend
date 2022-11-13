const { response } = require("express");
const {uploadFile} = require("../helpers/upload-file");
const {deleteFile} = require("../helpers/delete-file");
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

    res.json(product);
};

const productPost = async (req, res) => {
    const data = {...req.body};
    const product = new Product(data);

    if(req.files?.picture){
        const result = await uploadFile(req.files.picture.tempFilePath);
        product.picture = {
            public_id: result.public_id,
            secure_url: result.secure_url
        }
    }
    else{
        product.picture = {
            public_id: "none",
            secure_url: "../assets/no-image.png"
        }
    }

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

    if(req.files?.picture){
        const result = await uploadFile(req.files.picture.tempFilePath);
        newProduct.picture = {
            public_id: result.public_id,
            secure_url: result.secure_url
        }
    }
    else{
        product.picture = {
            public_id: "none",
            secure_url: "../assets/no-image.png"
        }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct , {new: true});
    res.json(updatedProduct);
};

//  Delete category - status:false
const productDelete = async (req, res = response) => {
    const { id } = req.params;
    const productDB = await Product.findByIdAndDelete(id);
    
    deleteFile(categoryDB.picture.public_id);
    res.json(productDB);
};

module.exports = {
    productsGet,
    getProduct,
    productPost,
    productPut,
    productDelete,
};
