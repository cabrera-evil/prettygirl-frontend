const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole, isAdminRole } = require("../middlewares");

const {
    isRoleValid,
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
        check("name", "Name is obligatory").not().isEmpty(),
        check("dui", "DUI is obligatory").not().isEmpty(),
        check("dui").custom(duiExist),
        check("email", "Invalid email").isEmail(),
        check("email").custom(emailExist),
        check("phone", "Phone is obligatory").not().isEmpty(),
        check("address", "Address is obligatory").not().isEmpty(),
        check("password", "The password must have more than 6 letters").isLength({
            min: 6,
        }),
        check("role").custom(isRoleValid),
        validateFields,
    ],
    usersPost
);

router.put(
    "/:id",
    [
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(userExistByID),
        validateFields,
    ],
    usersPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        hasRole("ADMIN_ROLE", "CLIENT_ROLE"),
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(userExistByID),
        validateFields,
    ],
    usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
