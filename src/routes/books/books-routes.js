const { COOKIE_AUTH_NAME } = require('../../auth/auth-cookie');
const {
  addBookHandler,
  getAllBooksHandler,
  getSpecificBookHandler,
  editBookHandler,
  deleteBookHandler,
  getBooksByCategoryHandler,
  getBooksByUserHandler,
} = require('../../handlers/books-handler');

const authOptions = {
  options: {
    auth: {
      mode: 'required',
      strategy: COOKIE_AUTH_NAME,
    },
  },
};

const booksRoutes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getSpecificBookHandler,
  },
  {
    method: 'GET',
    path: '/books/category/{categoryName?}',
    handler: getBooksByCategoryHandler,
  },
  {
    method: 'GET',
    path: '/books/my',
    handler: getBooksByUserHandler,
    ...authOptions,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    ...authOptions,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookHandler,
    ...authOptions,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
    ...authOptions,
  },
];

module.exports = {
  booksRoutes,
};