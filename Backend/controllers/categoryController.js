const Category = require("../models/Category");

const createCategory = async (req, res) => {
    try {
        const category = new Category({ name: req.body.name });
        await category.save();
        return res.status(201).json({
            "statuscode": 201,
            "successcode": true,
            "message": "Category created successfully",
            "data": category
        });
    } catch (error) {
        return res.status(400).json({
            "statuscode": 400,
            "successcode": false,
            "message": error.message,
            "data": []
        });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            "statuscode": 200,
            "successcode": true,
            "message": "Categories fetched successfully",
            "data": categories
        });
    } catch (error) {
        return res.status(500).json({
            "statuscode": 500,
            "successcode": false,
            "message": "Server error",
            "data": []
        });
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({
                "statuscode": 404,
                "successcode": false,
                "message": "Category not found",
                "data": []
            });
        }
        return res.status(200).json({
            "statuscode": 200,
            "successcode": true,
            "message": "Category fetched successfully",
            "data": category
        });
    } catch (error) {
        return res.status(500).json({
            "statuscode": 500,
            "successcode": false,
            "message": "Server error",
            "data": []
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({
                "statuscode": 404,
                "successcode": false,
                "message": "Category not found",
                "data": []
            });
        }
        return res.status(200).json({
            "statuscode": 200,
            "successcode": true,
            "message": "Category updated successfully",
            "data": category
        });
    } catch (error) {
        return res.status(400).json({
            "statuscode": 400,
            "successcode": false,
            "message": error.message,
            "data": []
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({
                "statuscode": 404,
                "successcode": false,
                "message": "Category not found",
                "data": []
            });
        }
        return res.status(200).json({
            "statuscode": 200,
            "successcode": true,
            "message": "Category deleted successfully",
            "data": []
        });
    } catch (error) {
        return res.status(500).json({
            "statuscode": 500,
            "successcode": false,
            "message": "Server error",
            "data": []
        });
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
};
