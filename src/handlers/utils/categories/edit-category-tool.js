const CategoriesResponses = require('../../responses/categories-responses');
const CategoriesController = require('../../../db/controllers/categories-controller');
const { checkAccountLevel } = require('../../helper/users-helper');
const { checkCategoryIsAvailable } = require('../../helper/categories-helper');

const editCategoryTool = async ({ request, h }) => {
  const { name } = request.payload;
  const { categoryId: id } = request.params;
  const response = new CategoriesResponses(h);
  const categoriesController = new CategoriesController(request);
  const isSuperAdmin = checkAccountLevel(request.auth.credentials.admin);

  if (!isSuperAdmin) return response.accessDenied();

  if (!id) return response.idValueNotValid();

  const statusCategoryId = await categoriesController.getOneCategory({ id });

  if (!statusCategoryId) return response.notFound();

  const statusCategoryName = await checkCategoryIsAvailable(request, name);

  if (statusCategoryName) return response.alreadyExist();

  const editedCategory = { id, name };
  await categoriesController.updateCategory(editedCategory);
  const statusUpdatedCategory = await checkCategoryIsAvailable(request, name);

  if (statusUpdatedCategory) return response.successfullyUpdated(id);

  return response.serverError();
};

module.exports = {
  editCategoryTool,
};
