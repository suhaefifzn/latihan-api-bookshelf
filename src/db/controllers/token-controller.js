/* eslint-disable indent */
const COLLECTIONS = require('../collections');

class TokenController {
  constructor(request) {
    this.request = request;
  }

  async getToken(token) {
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.TOKEN)
                      .find({ token }).toArray();
    return response[0];
  }
}

module.exports = TokenController;