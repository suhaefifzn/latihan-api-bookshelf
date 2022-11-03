const { booksRoutes } = require('./books/books-routes');
const { loginRoutes } = require('./login/login-routes');
const { usersRoutes } = require('./users/users-routes');
const { categoriesRoutes } = require('./categories/categories-routes');

const routes = [
  ...usersRoutes,
  ...booksRoutes,
  ...loginRoutes,
  ...categoriesRoutes,
  {
    method: 'GET',
    path: '/{any*}',
    handler: (request, h) => {
      const response = h.response({
        status: 'fail',
        message: 'Halaman tidak ditemukan',
      });

      response.code(404);
      return response;
    },
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      if (request.auth.isAuthenticated) {
        return h.redirect('/home');
      }

      return h.redirect('/home');
    },
    options: {
      auth: {
        mode: 'try',
      },
    },
  },
];

module.exports = routes;