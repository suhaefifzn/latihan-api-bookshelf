const { addBookTool } = require('./utils/books/add-book-tool');
const { getAllBooksTool } = require('./utils/books/get-all-books-tool');
const { getSpecificBookTool } = require('./utils/books/get-specific-book-tool');
const { editBookTool } = require('./utils/books/edit-book-tool');
const { deleteBookTool } = require('./utils/books/delete-book-tool');
const { getBooksByCategoryTool } = require('./utils/books/get-books-by-category-tool');
const { getBooksByUserTool } = require('./utils/books/get-books-by-user-tool');

const addBookHandler = (request, h) => {
  const response = addBookTool({ request, h });
  return response;
};

const getAllBooksHandler = (request, h) => {
  const response = getAllBooksTool({ request, h });
  return response;
};

const getSpecificBookHandler = (request, h) => {
  const response = getSpecificBookTool({ request, h });
  return response;
};

const editBookHandler = (request, h) => {
  const response = editBookTool({ request, h });
  return response;
};

const deleteBookHandler = (request, h) => {
  const response = deleteBookTool({ request, h });
  return response;
};

const getBooksByCategoryHandler = (request, h) => {
  const response = getBooksByCategoryTool({ request, h });
  return response;
};

const getBooksByUserHandler = (request, h) => {
  const response = getBooksByUserTool({ request, h });
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getSpecificBookHandler,
  editBookHandler,
  deleteBookHandler,
  getBooksByCategoryHandler,
  getBooksByUserHandler,
};