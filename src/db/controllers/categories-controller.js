/* eslint-disable indent */
const COLLECTIONS = require('../collections');

class CategoriesController {
  constructor(request) {
    this.request = request;
  }

  async getAllCategories() {
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.CATEGORIES)
                      .find({}).toArray();
    return response;
  }

  async getOneCategory(category) {
    const { id } = category;

    try {
      const { ObjectID } = this.request.mongo;
      const categoryId = new ObjectID(id);
      const response = await this.request.mongo.db
                        .collection(COLLECTIONS.CATEGORIES)
                        .findOne({ _id: categoryId });
      return response;
    } catch (error) {
      return false;
    }
  }

  async addCategory(category) {
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.CATEGORIES)
                      .insertOne(category);
    return response;
  }

  async updateCategory(category) {
    const { id, name } = category;
    const { ObjectID } = this.request.mongo;
    const categoryId = new ObjectID(id);
    const editedCategory = { name };
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.CATEGORIES)
                      .updateOne({ _id: categoryId }, { $set: editedCategory });
    return response;
  }
}

module.exports = CategoriesController;