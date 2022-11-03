const UsersController = require('../../db/controllers/users-controller');

const SUPER_ADMIN = 1;

const checkAccountLevel = (level) => {
  return level === SUPER_ADMIN;
};

const checkValueEmptyOrNot = (payload) => {
  const {
    name,
    username,
    email,
    password,
  } = payload;
  const checkNameOrUsername = !name || !username;
  const checkEmailOrPassword = !email || !password;

  return (checkNameOrUsername || checkEmailOrPassword);
};

const checkUsernameOrEmailAvailable = async (request) => {
  const { username, email } = request.payload;
  const usersController = new UsersController(request);
  const statusUsername = await usersController.getOneUser({ username });
  const statusEmail = await usersController.getOneUser({ email });

  return (statusUsername || statusEmail);
};

const checkUserIsReadyToUse = async (request, id) => {
  const usersController = new UsersController(request);
  const statusUser = await usersController.getOneUser({ id });
  return statusUser;
};

module.exports = {
  checkAccountLevel,
  checkValueEmptyOrNot,
  checkUsernameOrEmailAvailable,
  checkUserIsReadyToUse,
};