const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole } = require("../middlewares");

const {
    emailExist,
    duiExist,
    userExistByID,
} = require("../helpers/db-validators");

const {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.post(
    "/",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("dui", "El DUI es obligatorio").not().isEmpty(),
        check("dui").custom(duiExist),
        check("email", "El email no es válido").isEmail(),
        check("email").custom(emailExist),
        check("phone", "El teléfono es obligatorio").not().isEmpty(),
        check("address", "La dirección es obligatoria").not().isEmpty(),
        check("password", "La contraseña debe tener mas de 6 letras").isLength({
            min: 6,
        }),
        validateFields,
    ],
    usersPost
);

router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(userExistByID),
        validateFields,
    ],
    usersPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        // isAdminRole,
        hasRole("admin"),
        check("id", "No es un ID valido").isMongoId(),
        check("id").custom(userExistByID),
        validateFields,
    ],
    usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
