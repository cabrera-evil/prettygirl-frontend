const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
    bookingGet,
    bookingPost,
    bookingPut,
    bookingDelete,
} = require("../controllers/bookings");
const { bookingExistByID, productExistByID, userExistByID } = require("../helpers/db-validators");

const router = Router();

router.get("/", bookingGet);

router.get(
    "/:id",
    [
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bookingExistByID),
        validateFields,
    ],
    bookingGet
);

router.post(
    "/",
    [
        validateJWT,
        check("description.products", "products are required").not().isEmpty(),
        check("description.products").isArray().custom(productExistByID),
        check("user", "User is required").not().isEmpty(),
        check("user").custom(userExistByID),
        check("address", "Address is required").not().isEmpty(),
        check("estimatedDelivery", "Estimated Delivery is required").not().isEmpty(),
        validateFields,
    ],
    bookingPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("description.products", "products are required").not().isEmpty(),
        check("description.products").isArray().custom(productExistByID),
        check("id").custom(bookingExistByID),
        check("user", "User is required").not().isEmpty(),
        check("user").custom(userExistByID),
        check("address", "Address is required").not().isEmpty(),
        check("estimatedDelivery", "Estimated Delivery is required").not().isEmpty(),
        validateFields,
    ],
    bookingPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bookingExistByID),
        validateFields,
    ],
    bookingDelete
);

module.exports = router;