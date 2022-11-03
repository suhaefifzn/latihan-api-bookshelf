const {
  getUsersHandler,
  addUserHandler,
  deleteUserHandler,
} = require('../../handlers/users-handler');
const { COOKIE_AUTH_NAME } = require('../../auth/auth-cookie');

const authOptions = {
  options: {
    auth: {
      mode: 'required',
      strategy: COOKIE_AUTH_NAME,
    },
  },
};

const usersRoutes = [
  {
    method: 'GET',
    path: '/users/{username?}',
    handler: getUsersHandler,
    ...authOptions,
  },
  {
    method: 'POST',
    path: '/users',
    handler: addUserHandler,
    ...authOptions,
  },
  {
    method: 'DELETE',
    path: '/users/{username?}',
    handler: deleteUserHandler,
    ...authOptions,
  },
];

module.exports = {
  usersRoutes,
};