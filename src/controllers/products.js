const express = require("express");
const userSchema = require("../models/product");

const router = express.Router();

//Create user
router.post("/product", (req, res) => {
    const user = userSchema(req.body);
    user.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

//Get users
router.get("/product", (req, res) => {
    userSchema.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

//Get user by id
router.get("/product/:id", (req, res) => {
    const { id } = req.params;
    userSchema.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

//Update user
router.patch("/product/:id", (req, res) => {
    const id = req.params.id;
    const { name, age, email } = req.body;
    userSchema.updateOne({ _id: id }, { $set: { name, age, email } })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

//Delete user
router.delete("/product/:id", (req, res) => {
    userSchema.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;