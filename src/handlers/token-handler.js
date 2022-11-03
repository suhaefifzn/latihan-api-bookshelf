const getTokenHandler = async (request, h) => {
  const myToken = await request.mongo.db.collection('token').findOne({});
  const response = h.response({
    status: 'status',
    data: {
      token: myToken.token,
    },
  });
  response.code(200);
  return response;
};

module.exports = getTokenHandler;