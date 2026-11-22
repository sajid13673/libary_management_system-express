const { Category } = require("../models");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // 1. Validate presence, type, and non-empty string
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required and must be a non-empty string.",
      });
    }

    const trimmedName = name.trim();

    if (trimmedName.length > 255) {
      return res.status(400).json({
        success: false,
        message: "Category name must not exceed 255 characters.",
      });
    }

    // 3. Create using only the validated field
    const category = await Category.create({ name: trimmedName });

    return res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    // 4. Handle duplicate category name cleanly
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create category.",
      error: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const queryOptions = {
      offset: (page - 1) * perPage,
      limit: perPage,
    };

    const totalItems = await Category.count(queryOptions);
    const totalPages = Math.ceil(totalItems / perPage);
    const categories = await Category.findAll(queryOptions);

    res.json({
      status: true,
      page,
      perPage,
      totalPages,
      totalItems,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { createCategory, getCategories };
