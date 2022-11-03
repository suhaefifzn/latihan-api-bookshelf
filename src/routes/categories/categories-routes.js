const {
  addCategoryHandler,
  editCategoryHandler,
  getAllCategoriesHandler,
} = require('../../handlers/categories-handler');
const { COOKIE_AUTH_NAME } = require('../../auth/auth-cookie');

const authOptions = {
  options: {
    auth: {
      mode: 'required',
      strategy: COOKIE_AUTH_NAME,
    },
  },
};

const categoriesRoutes = [
  {
    method: 'POST',
    path: '/categories',
    handler: addCategoryHandler,
    ...authOptions,
  },
  {
    method: 'PUT',
    path: '/categories/{categoryId?}',
    handler: editCategoryHandler,
    ...authOptions,
  },
  {
    method: 'GET',
    path: '/categories/{categoryId?}',
    handler: getAllCategoriesHandler,
  },
];

module.exports = {
  categoriesRoutes,
};