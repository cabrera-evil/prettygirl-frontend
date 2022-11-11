const { Router } = require('express');
const { check } = require("express-validator");
const user = require("../controllers/users")

// Get
const router = Router();
router.get("/", user)

module.exports = router