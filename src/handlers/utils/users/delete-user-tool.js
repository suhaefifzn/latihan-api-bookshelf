const UsersController = require('../../../db/controllers/users-controller');
const { checkAccountLevel } = require('../../helper/users-helper');
const UsersResponses = require('../../responses/users-responses');

const deleteUserTool = async ({ request, h }) => {
  const { username } = request.params;
  const response = new UsersResponses(h);
  const usersController = new UsersController(request);
  const itsMe = username === request.auth.credentials.username;
  const isSuperAdmin = checkAccountLevel(request.auth.credentials.admin);

  if (!isSuperAdmin || itsMe) return response.accessDenied();
  if (!username) return response.notFound();

  const user = await usersController.deleteUser({ username });
  const isSuccess = user.deletedCount > 0;

  if (isSuccess) return response.hasBeenDeleted();

  return response.notFound();
};

module.exports = {
  deleteUserTool,
};