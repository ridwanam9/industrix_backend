const { Category } = require("../models");

// GET /api/categories
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST /api/categories
exports.create = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// PUT /api/categories/:id
exports.update = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send("Category not found");

    await category.update(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE /api/categories/:id
exports.delete = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send("Category not found");

    await category.destroy();
    res.send("Category deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
