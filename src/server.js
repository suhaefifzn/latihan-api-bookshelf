/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
const Hapi = require('@hapi/hapi');
const HapiCookie = require('@hapi/cookie');
const AuthBearer = require('hapi-auth-bearer-token');
const routes = require('./routes/routes');
const { ConnectionDB } = require('./db');
const {
  bearerAuthOptions,
  BEARER_AUTH,
  BEARER_SCHEME,
} = require('./auth/auth-bearer');
const {
  COOKIE_AUTH_NAME,
  COOKIE_AUTH_SCHEME,
  cookieAuthOptions,
} = require('./auth/auth-cookie');

const HOST = 'localhost';
const PORT = process.env.PORT || 5000;

const plugins = [AuthBearer, ConnectionDB, HapiCookie];

const init = async () => {
  const server = Hapi.server({
    host: HOST,
    port: PORT,
  });

  await server.register(plugins);

  server.auth.strategy(COOKIE_AUTH_NAME, COOKIE_AUTH_SCHEME, cookieAuthOptions);
  server.auth.strategy(BEARER_AUTH, BEARER_SCHEME, bearerAuthOptions);
  server.auth.default(BEARER_AUTH);

  server.route(routes);

  await server.start();
  console.log(`Server berjalan di ${server.info.uri}`);
};

init();