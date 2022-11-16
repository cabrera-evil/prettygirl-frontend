const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // check if email exist
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ msg: "User | Wrong password - Email" });
        }

        // check if password is correct
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res
                .status(400)
                .json({ msg: "User | Wrong Password - Password" });
        }

        // generate token
        const token = await generateJWT(user.id);

        const {name, role} = user;

        res.json({
            user: {name, email, role},
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "There's a problem with the server, please contact the admin",
        });
    }
};

const renewToken = async (req, res = response) => {
    const { user } = req;

    const token = await generateJWT(user.id);

    res.json({
        user,
        token,
    });
};

module.exports = {
    login,
    renewToken,
};
