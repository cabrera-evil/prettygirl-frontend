const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
    categoriesGet,
    getCategory,
    categoryPost,
    categoryPut,
    categoryDelete,
} = require("../controllers/categories");
const { categoryExistByID } = require("../helpers/db-validators");

const router = Router();

router.get("/", categoriesGet);

router.get(
    "/:id",
    [
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(categoryExistByID),
        validateFields,
    ],
    getCategory
);

router.post(
    "/",
    [
        validateJWT,
        isAdminRole,
        check("name", "Name is required").not().isEmpty(),
        validateFields,
    ],
    categoryPost
);

router.put(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(categoryExistByID),
        check("name", "Name is required").not().isEmpty(),
        validateFields,
    ],
    categoryPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id").custom(categoryExistByID),
        validateFields,
    ],
    categoryDelete
);

module.exports = router;