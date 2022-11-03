/* eslint-disable indent */
const COLLECTIONS = require('../collections');

class UsersController {
  constructor(request) {
    this.request = request;
  }

  async getAllUsers() {
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.USERS)
                      .find({}).toArray();
    return response;
  }

  async getOneUser(user) {
    const { username, email, id } = user;

    if (username) {
      const response = await this.request.mongo.db
                        .collection(COLLECTIONS.USERS)
                        .findOne({ username });
      return response;
    }

    if (email) {
      const response = await this.request.mongo.db
                        .collection(COLLECTIONS.USERS)
                        .findOne({ email });
      return response;
    }

    const { ObjectID } = this.request.mongo;
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.USERS)
                      .findOne({ _id: new ObjectID(id) });
    return response;
  }

  async deleteUser(user) {
    const { username } = user;
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.USERS)
                      .deleteOne({ username });
    return response;
  }

  async addUser(user) {
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.USERS)
                      .insertOne(user);
    return response;
  }
}

module.exports = UsersController;