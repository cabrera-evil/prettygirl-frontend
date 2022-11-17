const Bag = require("../models/bag");

const bagGet = async (req, res) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [total, bag] = await Promise.all([
        Bag.countDocuments(query),
        Bag.find(query)
            .limit(Number(limit))
            .skip(Number(skip)),
    ]);

    res.json({
        total,
        bag,
    });
};

const getBag = async (req, res = response) => {
    const { id } = req.params;
    const bag = await Bag.findById(id)

    res.json(bag);
};

const bagPost = async (req, res) => {
    const data = {...req.body};
    const bag = new Bag(data);

    await bag.save();
    res.json({
        bag,
    });
};

const bagPut = async (req, res) => {
    const { id } = req.params;
    const newBag = {...req.body};

    const updatedBag = await Bag.findByIdAndUpdate(id, newBag , {new: true});
    res.json(updatedBag);
};

const bagDelete = async (req, res) => {
    const { id } = req.params;

    const BagDB = await Bag.findByIdAndDelete(id);
    res.json({
        BagDB,
    });
};

module.exports = {
    bagGet,
    getBag,
    bagPost,
    bagPut,
    bagDelete,
};
