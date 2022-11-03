const CategoriesController = require('../../../db/controllers/categories-controller');
const CategoriesResponses = require('../../responses/categories-responses');
const { checkAccountLevel } = require('../../helper/users-helper');
const {
  checkCategoryIsAvailable,
  checkCategoryIsReadyToUse,
} = require('../../helper/categories-helper');

const addCategoryTool = async ({ request, h }) => {
  const { name } = request.payload;
  const response = new CategoriesResponses(h);
  const categoriesController = new CategoriesController(request);
  const isSuperAdmin = checkAccountLevel(request.auth.credentials.admin);

  if (!isSuperAdmin) return response.accessDenied();
  if (!name) return response.nameValueNotValid();

  const statusCategory = await checkCategoryIsAvailable(request, name);

  if (statusCategory) return response.alreadyExist();

  const newCategory = { name };
  const addNewCategory = await categoriesController.addCategory(newCategory);
  const id = addNewCategory.insertedId.toString();
  const isSuccess = await checkCategoryIsReadyToUse(request, id);

  if (isSuccess) return response.successfullyAdded(id);

  return response.serverError();
};

module.exports = {
  addCategoryTool,
};