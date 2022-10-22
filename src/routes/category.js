const express = require("express");
const userSchema = require("../models/category");

const router = express.Router();

//Create user
router.post("/category", (req, res) => {
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
router.get("/category", (req, res) => {
    userSchema.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

//Get user by id
router.get("/category/:id", (req, res) => {
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
router.patch("/category/:id", (req, res) => {
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
router.delete("/category/:id", (req, res) => {
    userSchema.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;