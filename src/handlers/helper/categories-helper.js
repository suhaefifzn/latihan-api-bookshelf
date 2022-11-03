const CategoriesController = require('../../db/controllers/categories-controller');

const checkCategoryIsAvailable = async (request, name) => {
  const categoriesController = new CategoriesController(request);
  const categories = await categoriesController.getAllCategories();
  const statusCategory = categories.filter((category) => {
    return category.name.toLowerCase() === name.toLowerCase();
  }).length > 0;

  return statusCategory;
};

const checkCategoryIsReadyToUse = async (request, id) => {
  const categoriesController = new CategoriesController(request);
  const statusCategory = await categoriesController.getOneCategory({ id });
  return statusCategory;
};

module.exports = {
  checkCategoryIsAvailable,
  checkCategoryIsReadyToUse,
};