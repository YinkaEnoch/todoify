const TodoService = require("../services/todos.service");
const errorHandler = require("../utils/errorHandler");

exports.getTodos = async (req, res) => {
  try {
    const resp = await TodoService.getTodos();
    res.status(200).json({ ...resp });
  } catch (e) {
    errorHandler(e, res);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const resp = await TodoService.createTodo(req.body);

    res.status(201).json({ ...resp });
  } catch (e) {
    errorHandler(e, res);
  }
};

exports.getTodo = async (req, res) => {
  try {
    const resp = await TodoService.getTodo({ id: req.params.id });
    if (resp.code == 1) return res.status(404).json({ ...resp });
    res.status(200).json({ ...resp });
  } catch (e) {
    errorHandler(e, res);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const data = {
      id: req.params.id,
      todo: req.body.newTodo,
      files: req.body.files,
    };
    const resp = await TodoService.updateTodo({ ...data });
    if (resp.code == 1) return res.status(404).json({ ...resp });
    res.status(200).json({ ...resp });
  } catch (e) {
    errorHandler(e, res);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const resp = await TodoService.deleteTodo({ id: req.params.id });

    if (resp.code == 1) return res.status(404).json({ ...resp });
    res.status(200).json({ ...resp });
  } catch (e) {
    errorHandler(e, res);
  }
};
