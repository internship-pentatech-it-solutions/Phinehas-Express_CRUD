const express = require("express");
const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controller/todoController");

const route = express.Router();

//create a todo
route.post("/todo", createTodo);

//get todo
route.get("/todo", getAllTodo);

//update todo
route.put("/todo/:id", updateTodo);

//delete todo
route.delete("/todo/:id", deleteTodo);
module.exports = route;
