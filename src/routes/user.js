const { Router } = require('express');
const { check } = require("express-validator");
const userRoutes = require("../controllers/user")

// Get
const router = Router();
router.get("/", userRoutes)

module.exports = router