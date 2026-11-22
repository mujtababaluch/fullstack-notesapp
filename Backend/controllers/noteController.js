const Note = require("../models/Note");
const Category = require("../models/Category");

const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        "statuscode": 400,
        "successcode": false,
        "message": "Please upload an image",
        "data": []
      });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        "statuscode": 404,
        "successcode": false,
        "message": "Category not found",
        "data": []
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
      image: req.file.filename,
    });

    return res.status(201).json({
      "statuscode": 201,
      "successcode": true,
      "message": "Note created successfully",
      "data": note
    });
  } catch (err) {
    return res.status(400).json({
      "statuscode": 400,
      "successcode": false,
      "message": err.message,
      "data": []
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("category", "name");

    const result = notes.map((note) => ({
      _id: note._id,
      title: note.title,
      content: note.content,
      category: note.category,
      imageUrl: "http://localhost:5000/uploads/" + note.image,
    }));

    return res.status(200).json({
      "statuscode": 200,
      "successcode": true,
      "message": "Notes fetched successfully",
      "data": result
    });
  } catch (err) {
    return res.status(500).json({
      "statuscode": 500,
      "successcode": false,
      "message": err.message,
      "data": []
    });
  }
};

module.exports = { createNote, getNotes };
