const express = require("express");
const TODO = require("../model/todoModel");
const mongoose = require("mongoose");

//create todo controller
const createTodo = async (request, response) => {
  const data = request.body;
  const created = await TODO.create(data);
  response.send(created);
};

const getAllTodo = async (request, response) => {
  try {
    const todo = await TODO.find();
    response.send(todo);
  } catch (error) {
    response.send(error.message);
  }
};

//update todo controller
const updateTodo = async (request, response) => {
  const id = request.params.id;
  const { completed } = request.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send(`Invalid id passed`);
    }
    const updated = { completed };
    const updateTodoTaker = await TODO.findByIdAndUpdate(id, updated, {
      new: true,
    });
    if (!updateTodoTaker) {
      return response.send("Not updated successfully").status(404);
    }
    response.status(201).json(updateTodoTaker);
  } catch (error) {
    response.send(`Error: ${error.message}`);
  }
};

const deleteTodo = async (request, response) => {
  const { id } = request.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).send("Invalid ID");
    }
    const deleteById = await TODO.findByIdAndDelete(id);
    if (!deleteById) {
      response.status(404).send("ID not found");
    }
    response.status(200).send(deleteById);
  } catch (error) {
    response.status(400).send(`Error: ${error.message}`);
  }
};

module.exports = { getAllTodo, createTodo, updateTodo, deleteTodo };
