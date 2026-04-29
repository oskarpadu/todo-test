const TodoModel = require('../models/todo.model');

const createTodo = async (req, res, next) => {
    try {
        const createdModel = await TodoModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (error) {
        next(error);
    }
}

const getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({});
        res.status(200).json(allTodos);
    } catch (error) {
        next(error);
    }
}

const getTodoById = async (req, res, next) => {
    try {
        const todoModel = await TodoModel.findById(req.params.todoId);
        if (!todoModel) {
            return res.status(404).send();
        }
        return res.status(200).json(todoModel);
    } catch (error) {
        next(error);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).send();
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(
            req.params.todoId
        );
        if (!deletedTodo) {
            return res.status(404).send();
        }
        res.status(200).json(deletedTodo);
    } catch (error) {
        next(error);
    }
};

module.exports = {createTodo, getTodos, getTodoById, updateTodo, deleteTodo};