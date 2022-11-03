const { addCategoryTool } = require('./utils/categories/add-category-tool');
const { editCategoryTool } = require('./utils/categories/edit-category-tool');
const { getCategoriesTool } = require('./utils/categories/get-categories-tool');

const addCategoryHandler = (request, h) => {
  const response = addCategoryTool({ request, h });
  return response;
};

const editCategoryHandler = (request, h) => {
  const response = editCategoryTool({ request, h });
  return response;
};

const getAllCategoriesHandler = (request, h) => {
  const response = getCategoriesTool({ request, h });
  return response;
};

module.exports = {
  addCategoryHandler,
  editCategoryHandler,
  getAllCategoriesHandler,
};