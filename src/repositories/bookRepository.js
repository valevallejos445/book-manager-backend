// src/repositories/bookRepository.js
const Book = require('../models/Book');

const create = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

const findAll = async () => {
  return await Book.find().populate('userId', 'name email');
};

const findById = async (id) => {
  return await Book.findById(id).populate('userId', 'name email');
};

const updateById = async (id, updateData) => {
  return await Book.findByIdAndUpdate(id, updateData, { new: true }).populate('userId', 'name email');
};

const deleteById = async (id) => {
  return await Book.findByIdAndDelete(id);
};

module.exports = { create, findAll, findById, updateById, deleteById };