const BooksController = require('../../../db/controllers/books-controller');
const BooksResponses = require('../../responses/books-responses');

const getBooksByUserTool = async ({ request, h }) => {
  const booksController = new BooksController(request);
  const response = new BooksResponses(h);
  const myName = request.auth.credentials.name;
  const myBooks = await booksController.getBooksByUser(myName);
  const isSuccess = myBooks.length > 0;

  if (isSuccess) return response.allBooksFound(myBooks);

  return response.allBooksFound();
};

module.exports = {
  getBooksByUserTool,
};