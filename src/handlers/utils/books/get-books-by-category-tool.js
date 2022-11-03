/* eslint-disable indent */
const BooksResponses = require('../../responses/books-responses');
const BooksController = require('../../../db/controllers/books-controller');
const { getCategoryByName } = require('../../helper/books-helper');

const getBooksByCategoryTool = async ({ request, h }) => {
  const { categoryName } = request.params;
  const response = new BooksResponses(h);
  const booksController = new BooksController(request);

  if (!categoryName) return response.categoryIsEmpty();

  const getCategory = await getCategoryByName(request);

  if (getCategory) {
    const books = await booksController
                  .getBooksByCategoryName(getCategory);
    if (books < 1) return response.notFound();
    return response.allBooksFound(books);
  }

  return response.notFound();
};

module.exports = {
  getBooksByCategoryTool,
};