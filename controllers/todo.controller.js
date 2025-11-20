const { Todo, Category } = require("../models");
const { Op } = require("sequelize");

// GET /api/todos
exports.findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || "";
    const status = req.query.status;        // completed / pending
    const category = req.query.category;    // category_id
    const priority = req.query.priority;    // high / medium / low

    let where = {
      title: { [Op.iLike]: `%${search}%` }
    };

    if (status === "completed") where.completed = true;
    if (status === "pending") where.completed = false;

    if (category) where.category_id = category;
    if (priority) where.priority = priority;

    const { rows, count } = await Todo.findAndCountAll({
      where,
      include: [Category],
      limit,
      offset,
    });

    res.json({
      data: rows,
      pagination: {
        current_page: page,
        per_page: limit,
        total: count,
        total_pages: Math.ceil(count / limit)
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


// POST /api/todos
exports.create = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET /api/todos/:id
exports.findOne = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id, { include: [Category] });
    if (!todo) return res.status(404).send("Todo not found");
    res.json(todo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// PUT /api/todos/:id
exports.update = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).send("Todo not found");

    await todo.update(req.body);
    res.json(todo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE /api/todos/:id
exports.delete = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).send("Todo not found");

    await todo.destroy();
    res.send("Todo deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// PATCH /api/todos/:id/complete
exports.toggleComplete = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).send("Todo not found");

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
