const Router = require("express").Router();
const {
  getTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos.controller");

Router.route("/todos").get(getTodos).post(createTodo);

Router.route("/todos/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

module.exports = Router;
