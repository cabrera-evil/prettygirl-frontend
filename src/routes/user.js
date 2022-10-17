const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

//Create user
router.post("/users", (req, res) => {
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
router.get("/users", (req, res) => {
    userSchema.find()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

//Get user by id
router.get("/users/:id", (req, res) => {
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
router.patch("/users/:id", (req, res) => {
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
router.delete("/users/:id", (req, res) => {
    userSchema.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json({ message: err });
        });
});

module.exports = router;