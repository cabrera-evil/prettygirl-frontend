const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
    bagGet,
    getBag,
    bagPost,
    bagPut,
    bagDelete,
} = require("../controllers/bags");
const { bagExistByID, productExistByID, userExistByID } = require("../helpers/db-validators");

const router = Router();

router.get("/", validateJWT, bagGet);

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bagExistByID),
        validateFields,
    ],
    getBag
);

router.post(
    "/",
    [
        validateJWT,
        isAdminRole,
        check("user", "User is required").not().isEmpty(),
        check("user").custom(userExistByID),
        check("products", "Products is required").not().isEmpty(),
        check("products.detail", "Detail is required").not().isEmpty(),
        check("products.detail.product_id", "Product ID is required").not().isEmpty(),
        check("products.detail.product_id").custom(productExistByID),
        check("products.detail.amount", "Amount is required").not().isEmpty(),
        validateFields,
    ],
    bagPost
);

router.put(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("user", "User is required").not().isEmpty(),
        check("user").custom(userExistByID),
        check("products", "Products is required").not().isEmpty(),
        check("products.detail", "Detail is required").not().isEmpty(),
        check("products.detail.product_id", "Product ID is required").not().isEmpty(),
        check("products.detail.product_id").custom(productExistByID),
        check("products.detail.amount", "Amount is required").not().isEmpty(),
        validateFields,
    ],
    bagPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bagExistByID),
        validateFields,
    ],
    bagDelete
);

module.exports = router;