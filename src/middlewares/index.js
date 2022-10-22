const express = require('express');
const userRoutes = require("../routes/user");

const config = async (app) => {
    app.use(express.json());
    app.use('/api', userRoutes);
}

module.exports = {config};