/* eslint-disable indent */
const BooksController = require('../../../db/controllers/books-controller');
const BooksResponses = require('../../responses/books-responses');
const {
  checkValueIsEmptyOrNot,
  getCategoryById,
  checkIdLength,
} = require('../../helper/books-helper');

const editBookTool = async ({ request, h }) => {
  const { bookId: id } = request.params;
  const response = new BooksResponses(h);
  const booksController = new BooksController(request);
  const statusId = checkIdLength(id);
  const book = await booksController.getOneBook(id);
  const { addedBy } = book;
  const itsMyBook = request.auth.credentials.name === addedBy;

  if (!itsMyBook) return response.accessDenied();

  if (!statusId) return response.notFound();

  const {
    title,
    year,
    author,
    publisher,
    categoryId,
    body,
  } = request.payload;

  const statusTitleAndAuthor = checkValueIsEmptyOrNot(request.payload);

  if (statusTitleAndAuthor) return response.valueIsEmpty();

  const updatedAt = new Date().toISOString();
  const getCategory = await getCategoryById(request);
  const category = {
    id: categoryId,
    name: getCategory.name,
  };
  const editedBook = {
    title,
    year,
    author,
    publisher,
    category,
    body,
    updatedAt,
  };

  const updateBook = await booksController.updateBook(id, editedBook);

  if (updateBook.modifiedCount > 0) return response.successfullyUpdated(id);

  return response.notFound();
};

module.exports = {
  editBookTool,
};