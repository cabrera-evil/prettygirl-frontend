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

// Obtener todas las categorias - publico
router.get("/", categoriesGet);

// Obtener una categoria por id - publico
router.get(
    "/:id",
    [
        check("id", "Invalid Mongo ID"),
        check("id").custom(categoryExistByID),
        validateFields,
    ],
    getCategory
);

// Crear categoria - privado - cualquier persona con un token valido
router.post(
    "/",
    [
        validateJWT,
        check("id", "ID is required").not().isEmpty(),
        check("name", "Name is required").not().isEmpty(),
        check("picture", "Picture is required").not().isEmpty(),
        validateFields,
    ],
    categoryPost
);

// Actualizar categoria - privado - cualquier persona con un token valido
router.put(
    "/:id",
    [
        validateJWT,
        check("id", "ID is required").not().isEmpty(),
        check("name", "Name is required").not().isEmpty(),
        check("id").custom(categoryExistByID),
        validateFields,
    ],
    categoryPut
);

// Eliminar categoria - admin
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
