// src/controllers/bookController.js
const bookService = require('../services/bookService');

const createBook = async (req, res, next) => {
  try {
    const bookData = { ...req.body, userId: req.user._id };
    const book = await bookService.createBook(bookData);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };