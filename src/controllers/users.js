const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).limit(Number(limit)).skip(Number(skip)),
    ]);

    res.json({
        total,
        users,
    });
};

const usersPost = async (req, res) => {
    const data = {...req.body};
    const user = new User(data);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);

    await user.save();
    res.json({
        user,
    });
};

const usersPut = async (req, res) => {
    const { id } = req.params;
    const newUser = {...req.body};

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    const updatedUser = await User.findByIdAndUpdate(id, newUser , {new: true});
    res.json(updatedUser);
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - Controller",
    });
};

const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    const userDB = await User.findByIdAndDelete(id);
    res.json({
        userDB,
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
};
