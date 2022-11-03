/* eslint-disable indent */
const UsersController = require('../../../db/controllers/users-controller');
const { checkAccountLevel } = require('../../helper/users-helper');
const UsersResponses = require('../../responses/users-responses');

const getUsersTool = async ({ request, h }) => {
  const { username } = request.params;
  const response = new UsersResponses(h);
  const usersController = new UsersController(request);
  const isSuperAdmin = checkAccountLevel(request.auth.credentials.admin);

  if (isSuperAdmin) {
    if (username) {
      const user = await usersController.getOneUser({ username });
      if (!user) return response.notFound();
      return response.userFound(user);
    }

    const users = await usersController.getAllUsers();
    return response.allUsersFound(users);
  }

  return response.accessDenied();
};

module.exports = {
  getUsersTool,
};