const { Todos } = require("../models/todos.model");
const { NotFoundHandler } = require("../utils/notFoundHandler");

exports.getTodos = async () => {
  try {
    return Todos.find().lean().exec();
  } catch (e) {
    return { code: 1, status: "ERR", e };
  }
};

exports.createTodo = async (data) => {
  try {
    const todo = new Todos({ ...data });
    const newTodo = await todo.save();
    return { code: 0, status: "OK", todo: newTodo };
  } catch (e) {
    return { code: 1, status: "ERR", e };
  }
};

exports.getTodo = async (data) => {
  try {
    const todo = await Todos.findById(data.id).exec();
    if (!todo) return NotFoundHandler(data);

    return { code: 0, status: "OK", todo };
  } catch (e) {
    return { code: 1, status: "ERR", e };
  }
};

exports.updateTodo = async (data) => {
  try {
    const { code } = await this.getTodo({ id: data.id });
    if (code == 1) return NotFoundHandler(data);

    const { id, ...newTodo } = data;
    const updatedTodo = await Todos.findByIdAndUpdate(
      data.id,
      { ...newTodo },
      { new: true }
    ).exec();

    return { code: 0, status: "OK", todo: updatedTodo };
  } catch (e) {
    return { code: 1, status: "ERR", e };
  }
};

exports.deleteTodo = async (data) => {
  try {
    const { code, todo } = await this.getTodo({ id: data.id });
    if (code == 1) return NotFoundHandler(data);

    const deleted = await todo.deleteOne();
    if (deleted) return { code: 0, status: "OK", todo: deleted };

    return { code: 1, status: "ERR", e: deleted };
  } catch (e) {
    return { code: 1, status: "ERR", e };
  }
};
