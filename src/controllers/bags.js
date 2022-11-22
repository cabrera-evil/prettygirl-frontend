const Bag = require("../models/bag");
const Product = require("../models/product");

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

const bagProductsGet = async (req, res) => {
    const { id } = req.params;
    const bag = await Bag.findById(id);
    const products = bag.products;
    const productsData = [];

    for (let i = 0; i < products.length; i++) {
        const product = await Product.findById(products[i]);
        productsData.push(product);
    }
    res.json(productsData);
};

const getBag = async (req, res = response) => {
    const { id } = req.params;
    const bag = await Bag.find({user:id});
    console.log(bag)

    res.json(bag);
};

const bagPost = async (req, res) => {
    const bag = new Bag(req.body);

    if(await verifyProducts(bag.products)){
        await bag.save();
        res.json({
            bag,
        });
    }
    else{
        return res.status(400).json({
            msg: "Please fill the products array correctly"
        });
    }
};

const bagPut = async (req, res) => {
    const { id } = req.params;
    const newBag = {...req.body};

    if(await verifyProducts(newBag.products)){
        const updatedBag = await Bag.findByIdAndUpdate(id, newBag , {new: true});
        res.json(updatedBag);
    }
    else{
        return res.status(400).json({
            msg: "Please fill the products array correctly"
        });
    }
};

const bagDelete = async (req, res) => {
    const { id } = req.params;

    const BagDB = await Bag.findByIdAndDelete(id);
    res.json({
        BagDB,
    });
};

// Helper functions
const verifyProducts = async (products) =>{
    for (let i = 0; i < products.length; i++) {
        try{
            const findProduct = await Product.findById(products[i]._id);
            if(!findProduct){
                return false;
            }
        }catch{
            return false;
        }
    }
    return true;
}

module.exports = {
    bagGet,
    bagProductsGet,
    getBag,
    bagPost,
    bagPut,
    bagDelete,
};
