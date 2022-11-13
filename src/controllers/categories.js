const Category = require("../models/category");

// Get categories - paginate - total - populate
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

// Get category - populate {}
const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    res.json(category);
};

const categoryPost = async (req, res) => {
    const id = req.body._id.toUpperCase();

    // Check if category exists
    const categoryDB = await Category.findById(id);
    if (categoryDB) {
        return res.status(400).json({
            msg: `Category: ${categoryDB.name}, already exists`,
        });
    }
    else{
        const data = {...req.body};
        const category = new Category(data);

        await category.save();

        res.json({
            category,
        });
    }
};

// Update category
const categoryPut = async (req, res) => {
    const { id } = req.params;
    const newCategory = {...req.body};

    const updatedCategory = await Category.findByIdAndUpdate(id, newCategory , {new: true});

    res.json(updatedCategory);
};

//  Delete category - status:false
const categoryDelete = async (req, res) => {
    const { id } = req.params;
    const categoryDB = await Category.findByIdAndDelete(id);

    res.json(categoryDB);
};

module.exports = {
    categoriesGet,
    getCategory,
    categoryPost,
    categoryPut,
    categoryDelete,
};
