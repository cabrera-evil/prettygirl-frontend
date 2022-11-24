const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
    bagGet,
    bagProductsGet,
    getBag,
    bagPost,
    bagPut,
    bagDelete,
} = require("../controllers/bags");
const { bagExistByID, bagExistByUser, userExistByID } = require("../helpers/db-validators");

const router = Router();

router.get("/", validateJWT, bagGet);

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bagExistByUser),
        validateFields,
    ],
    getBag
);

router.get(
    "/products/:id",
    [
        validateJWT,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bagExistByID),
        validateFields
    ],
    bagProductsGet
)

router.post(
    "/",
    [
        validateJWT,
        check("user", "User is required").not().isEmpty(),
        check("user", "Invalid Mongo ID").isMongoId(),
        check("user").custom(userExistByID),
        check("products").not().isEmpty(),
        validateFields,
    ],
    bagPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("user", "User is required").not().isEmpty(),
        check("user", "Invalid Mongo ID").isMongoId(),
        check("user").custom(userExistByID),
        check("products").not().isEmpty(),
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