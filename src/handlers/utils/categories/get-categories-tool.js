const CategoriesController = require('../../../db/controllers/categories-controller');
const CategoriesResponses = require('../../responses/categories-responses');

const getCategoriesTool = async ({ request, h }) => {
  const { categoryId: id } = request.params;
  const categoriesController = new CategoriesController(request);
  const response = new CategoriesResponses(h);

  if (!id) {
    const categories = await categoriesController.getAllCategories();
    if (categories) return response.allCategoriesFound(categories);
  }

  if (id) {
    const category = await categoriesController.getOneCategory({ id });
    if (category) return response.oneCategoryFound(category);
    return response.notFound();
  }

  return response.getAllCategories();
};

module.exports = {
  getCategoriesTool,
};