/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const UsersController = require('../db/controllers/users-controller');

const getLoginHandler = async (request, h) => {
  if (request.auth.isAuthenticated) {
    return h.redirect('/welcome');
  }

  const response = h.response({
    status: 'success',
    message: 'Silahkan login dengan username dan password yang sudah terdaftar',
  });

  response.code(200);
  return response;
};

const postLoginHandler = async (request, h) => {
  const { username, password } = request.payload;
  const usersController = new UsersController(request);
  const account = await usersController.getOneUser({ username });

  if (!account) return h.redirect('/login');

  const statusPassword = await bcrypt.compare(password, account.password);

  if (!statusPassword) return h.redirect('/login');

  request.cookieAuth.set({ id: account._id.toString() });

  return h.redirect('/welcome');
};

module.exports = {
  getLoginHandler,
  postLoginHandler,
};