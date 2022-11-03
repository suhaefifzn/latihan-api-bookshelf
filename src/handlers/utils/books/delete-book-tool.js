const BooksResponses = require('../../responses/books-responses');
const { checkIdLength } = require('../../helper/books-helper');
const BooksController = require('../../../db/controllers/books-controller');

const deleteBookTool = async ({ request, h }) => {
  const { bookId: id } = request.params;
  const booksController = new BooksController(request);
  const response = new BooksResponses(h);
  const statusId = checkIdLength(id);
  const book = await booksController.getOneBook(id);
  const { addedBy } = book;
  const itsMyBook = request.auth.credentials.name === addedBy;

  if (!itsMyBook) return response.accessDenied();

  if (!statusId) return response.notFound();

  const deletedBook = await booksController.deleteBook(id);
  if (deletedBook.deletedCount > 0) return response.successfullyDeleted(id);

  return response.notFound();
};

module.exports = {
  deleteBookTool,
};