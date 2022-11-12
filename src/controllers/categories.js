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
    const category = await Category.findById(id).populate("user", "name");

    res.json(category);
};

const categoryPost = async (req, res) => {
    const {_id, name, picture} = req.body;
    const category = new Category({_id, name, picture});

    // Saving in db
    await category.save();

    res.status(201).json(category);
};

// Update category
const categoryPut = async (req, res) => {
    const { id } = req.params;
    const { _id, name, picture, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, {
        new: true,
    });

    res.json(category);
};

//  Delete category - status:false
const categoryDelete = async (req, res) => {
    const { id } = req.params;

    const categoryDB = await Category.findByIdAndUpdate(
        id,
        { status: false },
        {
            new: true,
        }
    );

    res.json(categoryDB);
};

module.exports = {
    categoriesGet,
    getCategory,
    categoryPost,
    categoryPut,
    categoryDelete,
};
