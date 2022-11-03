const {
  getLoginHandler,
  postLoginHandler,
} = require('../../handlers/login-handler');
const { COOKIE_AUTH_NAME } = require('../../auth/auth-cookie');

const loginRoutes = [
  {
    method: 'GET',
    path: '/login',
    handler: getLoginHandler,
    options: {
      auth: {
        mode: 'optional',
        strategy: COOKIE_AUTH_NAME,
      },
    },
  },
  {
    method: 'POST',
    path: '/login',
    handler: postLoginHandler,
    options: {
      auth: {
        mode: 'try',
      },
    },
  },
  {
    method: 'GET',
    path: '/logout',
    handler: (request, h) => {
      request.cookieAuth.clear();
      const response = h.response({
        status: 'success',
        message: 'Berhasil logout',
      });

      response.code(200);
      return response;
    },
    options: {
      auth: {
        mode: 'required',
        strategy: COOKIE_AUTH_NAME,
      },
    },
  },
  {
    method: 'GET',
    path: '/welcome',
    handler: (request, h) => {
      const response = h.response({
        status: 'success',
        message: `${request.auth.credentials.name}, berhasil login!`,
      });

      response.code(200);
      return response;
    },
    options: {
      auth: {
        mode: 'required',
        strategy: COOKIE_AUTH_NAME,
      },
    },
  },
];

module.exports = {
  loginRoutes,
};