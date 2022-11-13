const { Router } = require("express");
const { check } = require("express-validator");

const { login, renewToken } = require("../controllers/auth");
const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.post(
    "/login",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        validateFields,
    ],
    login
);

router.get("/", validateJWT, renewToken);

module.exports = router;
