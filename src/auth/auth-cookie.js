/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const UsersController = require('../db/controllers/users-controller');

const COOKIE_AUTH_NAME = 'session';
const COOKIE_AUTH_SCHEME = 'cookie';
const { COOKIE_PASSWORD, COOKIE_NAME } = process.env;

const cookieAuthOptions = {
  cookie: {
    name: COOKIE_NAME,
    password: COOKIE_PASSWORD,
  },
  redirectTo: '/login',
  validate: async (request, session) => {
    const usersController = new UsersController(request);
    const account = await usersController.getOneUser({ id: session.id });
    const isSuccess = session.id === account._id.toString();

    if (!isSuccess) return { isValid: false };

    return { isValid: true, credentials: account };
  },
};

module.exports = {
  cookieAuthOptions,
  COOKIE_AUTH_NAME,
  COOKIE_AUTH_SCHEME,
};