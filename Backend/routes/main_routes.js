const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const categoryRoutes = require("./categoryRoutes");
const noteRoutes = require("./noteRoutes");

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
