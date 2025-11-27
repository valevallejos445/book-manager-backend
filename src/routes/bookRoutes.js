// src/routes/bookRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const { validateBook, handleValidationErrors } = require('../middleware/validate');
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');

const router = express.Router();

router.route('/')
  .post(protect, validateBook, handleValidationErrors, createBook)
  .get(getAllBooks);

router.route('/:id')
  .get(getBookById)
  .put(protect, validateBook, handleValidationErrors, updateBook)
  .delete(protect, deleteBook);

module.exports = router;