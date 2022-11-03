/* eslint-disable indent */
const { addUserTool } = require('./utils/users/add-user-tool');
const { deleteUserTool } = require('./utils/users/delete-user-tool');
const { getUsersTool } = require('./utils/users/get-users-tool');

const getUsersHandler = (request, h) => {
  const response = getUsersTool({ request, h });
  return response;
};

const addUserHandler = (request, h) => {
  const response = addUserTool({ request, h });
  return response;
};

const deleteUserHandler = (request, h) => {
  const response = deleteUserTool({ request, h });
  return response;
};

module.exports = {
  getUsersHandler,
  addUserHandler,
  deleteUserHandler,
};