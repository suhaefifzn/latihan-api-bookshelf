/* eslint-disable indent */
const BooksController = require('../../../db/controllers/books-controller');
const BooksResponses = require('../../responses/books-responses');

const getAllBooksTool = async ({ request, h }) => {
  const response = new BooksResponses(h);
  const booksController = new BooksController(request);
  const books = await booksController.getAllBooks();

  if (books) return response.allBooksFound(books);

  return response.allBooksFound();
};

module.exports = { getAllBooksTool };