/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const BooksResponses = require('../../responses/books-responses');
const {
  checkValueIsEmptyOrNot,
  createOverviewBook,
  getCategoryById,
} = require('../../helper/books-helper');
const BooksController = require('../../../db/controllers/books-controller');

const addBookTool = async ({ request, h }) => {
  const {
    title,
    year,
    author,
    publisher,
    categoryId,
    body,
  } = request.payload;

  const response = new BooksResponses(h);
  const booksController = new BooksController(request);
  const statusValue = checkValueIsEmptyOrNot(request.payload);

  if (statusValue) return response.valueIsEmpty();

  const getCategory = await getCategoryById(request);
  const category = {
    id: categoryId,
    name: getCategory.name,
  };
  const addedBy = request.auth.credentials.name;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const overview = createOverviewBook(body);

  const newBook = {
    title,
    year,
    author,
    publisher,
    category,
    addedBy,
    overview,
    body,
    insertedAt,
    updatedAt,
  };

  const insertBook = await booksController.addBook(newBook);
  const id = insertBook.insertedId.toString();
  const isSuccess = await booksController.getOneBook(id);

  if (isSuccess) return response.successfullyAdded(id);

  return response.failedToAdd();
};

module.exports = {
  addBookTool,
};