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
        check("name", "Name is obligatory").not().isEmpty(),
        check("category", "Invalid Mongo ID").isMongoId(),
        check("category").custom(categoryExistByID),
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
