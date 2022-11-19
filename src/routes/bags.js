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
        check("client_id", "Client ID is required").not().isEmpty(),
        check("client_id", "Invalid Mongo ID").isMongoId(),
        check("client_id").custom(userExistByID),
        check("products.product_id", "Product ID is required").not().isEmpty(),
        check("products.product_id").custom(productExistByID),
        check("products.amount", "Amount must be a number").isNumeric(),
        validateFields,
    ],
    bagPost
);

router.put(
    "/:id",
    [
        validateJWT,
        isAdminRole,
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