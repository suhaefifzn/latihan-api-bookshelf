/* eslint-disable no-unused-vars */
const TokenController = require('../db/controllers/token-controller');

const BEARER_AUTH = 'simple';
const BEARER_SCHEME = 'bearer-access-token';

const bearerAuthOptions = {
  allowQueryToken: true,
  accessTokenName: 'access_token',
  validate: async (request, token, h) => {
    try {
      const tokenController = new TokenController(request);
      const getToken = await tokenController.getToken(token);
      const isValid = token === getToken.token;
      const credentials = { token };
      return { isValid, credentials };
    } catch (error) {
      const response = h.response();
      return response.code(404);
    }
  },
};

module.exports = {
  bearerAuthOptions,
  BEARER_AUTH,
  BEARER_SCHEME,
};