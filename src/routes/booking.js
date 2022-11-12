const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const {
    bookingGet,
    bookingPost,
    bookingPut,
    bookingDelete,
} = require("../controllers/booking");
const { bookingExistByID } = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", bookingGet);

// Obtener una categoria por id - publico
router.get(
    "/:id",
    [
        check("id", "Invalid Mongo ID").isMongoId(),
        check("id").custom(bookingExistByID),
        validateFields,
    ],
    bookingGet
);

// Crear categoria - privado - cualquier persona con un token valido
router.post(
    "/",
    [
        validateJWT,
        check("name", "Name is obligatory").not().isEmpty(),
        check("id").custom(bookingExistByID),
        validateFields,
    ],
    bookingPost
);

// Actualizar categoria - privado - cualquier persona con un token valido
router.put(
    "/:id",
    [
        validateJWT,
        check("name", "Name is obligatory").not().isEmpty(),
        check("id").custom(bookingExistByID),
        validateFields,
    ],
    bookingPut
);

// Eliminar categoria - admin
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
