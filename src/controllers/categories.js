const {uploadFile} = require("../helpers/upload-file");
const {deleteFile} = require("../helpers/delete-file");
const Category = require("../models/category");

const categoriesGet = async (req, res) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .limit(Number(limit))
            .skip(Number(skip)),
    ]);

    res.json({
        total,
        categories,
    });
};

const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    res.json(category);
};

const categoryPost = async (req, res) => {
    const id = req.body._id.toUpperCase();

    const categoryDB = await Category.findById(id);
    if (categoryDB) {
        return res.status(400).json({
            msg: `Category: ${categoryDB.name}, already exists`,
        });
    }
    else{
        const data = {...req.body};
        const category = new Category(data);

        if(req.files?.picture){
            const result = await uploadFile(req.files.picture.tempFilePath);
            category.picture = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
        }
        else{
            category.picture = {
                public_id: "none",
                secure_url: "../assets/no-image.png"
            }
        }

        await category.save();
        res.json({
            category,
        });
    }
};

const categoryPut = async (req, res) => {
    const { id } = req.params;
    const newCategory = {...req.body};

    if(req.files?.picture){
        const result = await uploadFile(req.files.picture.tempFilePath);
        newCategory.picture = {
            public_id: result.public_id,
            secure_url: result.secure_url
        }
    }
    else{
        newCategory.picture = {
            public_id: "none",
            secure_url: "../assets/no-image.png"
        }
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, newCategory , {new: true});
    res.json(updatedCategory);
};

const categoryDelete = async (req, res) => {
    const { id } = req.params;
    const categoryDB = await Category.findByIdAndDelete(id);

    deleteFile(categoryDB.picture.public_id);
    res.json(categoryDB);
};

module.exports = {
    categoriesGet,
    getCategory,
    categoryPost,
    categoryPut,
    categoryDelete,
};
