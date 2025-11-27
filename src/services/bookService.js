// src/services/bookService.js
const bookRepository = require('../repositories/bookRepository');

const createBook = async (bookData) => {
  return await bookRepository.create(bookData);
};

const getAllBooks = async () => {
  return await bookRepository.findAll();
};

const getBookById = async (id) => {
  const book = await bookRepository.findById(id);
  if (!book) throw new Error('Libro no encontrado');
  return book;
};

const updateBook = async (id, updateData) => {
  const book = await bookRepository.findById(id);
  if (!book) throw new Error('Libro no encontrado');
  return await bookRepository.updateById(id, updateData);
};

const deleteBook = async (id) => {
  const book = await bookRepository.findById(id);
  if (!book) throw new Error('Libro no encontrado');
  return await bookRepository.deleteById(id);
};

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };