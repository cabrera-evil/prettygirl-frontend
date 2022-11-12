const path = require("path");
const fs = require("fs");

const cloudinary = require("../config/cloudinary");

const { response } = require("express");
const { uploadFile } = require("../helpers");

const Category = require("../models/category");
const Product = require("../models/product");

const loadFile = async (req, res = response) => {
    try {
        // Images only
        const name = await uploadFile(req.files, undefined, "images");
        res.json({ name });
    } catch (error) {
        res.status(400).send({ msg: error.msg });
    }
};

const updateImage = async (req, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case "categories":
            model = await Category.findById(id);

            if (!model) {
                return res.status(400).json({ msg: "The category does not exist" });
            }
            break;
        case "products":
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({ msg: "The product does not exist" });
            }
            break;
        default:
            return res.status(500).json({ msg: "Collection not allowed" });
    }

    // Cleaning previous image
    if (model.image) {
        // delete server image
        const pathImage = path.join(
            __dirname,
            "../uploads",
            collection,
            model.image
        );

        // if file exists, delete it
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage);
        }
    }

    const name = await uploadFile(req.files, undefined, collection);
    model.image = name;

    await model.save();

    res.json(model);
};

const updateImageCloudinary = async (req, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case "categories":
            model = await Category.findById(id);

            if (!model) {
                return res.status(400).json({ msg: "The category does not exist" });
            }
            break;
        case "products":
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({ msg: "The product does not exist" });
            }
            break;
        default:
            return res.status(500).json({ msg: "Collection not allowed" });
    }

    // Cleaning previous image
    if (model.image) {
        const nameArr = model.image.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split(".");

        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.image = secure_url;

    await model.save();

    res.json(model);
};

const showImage = async (req, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case "categories":
            model = await Category.findById(id);

            if (!model) {
                return res.status(400).json({ msg: "The category does not exist" });
            }
            break;
        case "products":
            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({ msg: "The product does not exist" });
            }
            break;
        default:
            return res.status(500).json({ msg: "Collection not allowed" });
    }

    // Cleaning previous image
    if (model.image) {
        return res.redirect(model.image);
    }

    const pathNotFound = path.join(__dirname, "../assets", "no-image.jpg");
    return res.sendFile(pathNotFound);
};

module.exports = {
    loadFile,
    updateImage,
    showImage,
    updateImageCloudinary,
};