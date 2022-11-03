/* eslint-disable indent */
const BooksController = require('../../../db/controllers/books-controller');
const BooksResponses = require('../../responses/books-responses');
const { checkIdLength } = require('../../helper/books-helper');

const getSpecificBookTool = async ({ request, h }) => {
  const { bookId: id } = request.params;
  const booksController = new BooksController(request);
  const response = new BooksResponses(h);
  const statusId = checkIdLength(id);

  if (!statusId) return response.notFound();

  const book = await booksController.getOneBook(id);
  if (book) return response.oneBookFound(book);

  return response.notFound();
};

module.exports = {
  getSpecificBookTool,
};