const express = require("express");
const upload = require("../middleware/upload");
const { createNote, getNotes } = require("../controllers/noteController");

const router = express.Router();

router.post("/", upload.single("image"), createNote);
router.get("/", getNotes);

module.exports = router;
