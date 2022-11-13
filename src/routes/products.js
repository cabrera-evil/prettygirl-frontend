const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
    productsGet,
    getProduct,
    productPost,
    productPut,
    productDelete,
} = require("../controllers/products");
const {
    categoryExistByID,
    productExistByID,
} = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", productsGet);

// Obtener una categoria por id - publico
router.get(
    "/:id",
    [
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(productExistByID),
        validateFields,
    ],
    getProduct
);

// Crear producto - privado - cualquier persona con un token valido
router.post(
    "/",
    [
        validateJWT,
        check("name", "Name is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
        check("category").custom(categoryExistByID),
        check("size", "Size is required").not().isEmpty(),
        check("color", "Color is required").not().isEmpty(),
        check("gender", "Gender is required").not().isEmpty(),
        check("available", "Available is required").not().isEmpty(),
        check("amount", "Amount is required").not().isEmpty(),
        check("price", "Price is required").not().isEmpty(),
        check("picture", "Picture is required").not().isEmpty(),
        validateFields,
    ],
    productPost
);

// Actualizar producto - privado - cualquier persona con un token valido
router.put(
    "/:id",
    [
        validateJWT,
        check("category", "Invalid Mongo ID").isMongoId(),
        check("id").custom(productExistByID),
        validateFields,
    ],
    productPut
);

// Eliminar categoria - admin
router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(productExistByID),
        validateFields,
    ],
    productDelete
);

module.exports = router;
