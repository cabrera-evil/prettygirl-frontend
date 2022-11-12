const { Router } = require("express");
const { check } = require("express-validator");

const { login, renewToken } = require("../controllers/auth");
const { validateFields, validateJWT } = require("../middlewares");

const router = Router();

router.post(
    "/login",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        validateFields,
    ],
    login
);

router.get("/", validateJWT, renewToken);

module.exports = router;
