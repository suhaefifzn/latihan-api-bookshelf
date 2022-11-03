/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const UsersResponses = require('../../responses/users-responses');
const UsersController = require('../../../db/controllers/users-controller');
const {
  checkValueEmptyOrNot,
  checkUsernameOrEmailAvailable,
  checkUserIsReadyToUse,
  checkAccountLevel,
} = require('../../helper/users-helper');

const SALT_ROUNDS = 10;
const DEFAULT_LEVEL = 0; // just admin

const addUserTool = async ({ request, h }) => {
  const {
    name,
    username,
    email,
    password,
  } = request.payload;

  const response = new UsersResponses(h);
  const usersController = new UsersController(request);
  const statusPropertyValue = checkValueEmptyOrNot(request.payload);

  const isSuperAdmin = checkAccountLevel(request.auth.credentials.admin);
  if (!isSuperAdmin) return response.accessDenied();

  if (statusPropertyValue) return response.propertyValueNotValid();

  const statusUsernameAndEmail = await checkUsernameOrEmailAvailable(request);
  if (statusUsernameAndEmail) return response.usernameOrEmailAlreadyTaken();

  const admin = DEFAULT_LEVEL;
  const bcryptPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = {
    name,
    username,
    email,
    admin,
    password: bcryptPassword,
  };

  const addUser = await usersController.addUser(newUser);
  const id = addUser.insertedId.toString();
  const isSuccess = await checkUserIsReadyToUse(request, id);

  if (isSuccess) return response.hasBeenAdded();

  return response.serverError();
};

module.exports = {
  addUserTool,
};