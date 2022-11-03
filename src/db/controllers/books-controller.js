/* eslint-disable indent */
const COLLECTIONS = require('../collections');

class BooksController {
  constructor(request) {
    this.request = request;
  }

  async getAllBooks() {
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.BOOKS)
                      .find({}).toArray();
    return response;
  }

  async getBooksByUser(user) {
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.BOOKS)
                      .find({ addedBy: user }).toArray();
    return response;
  }

  async getBooksByCategoryName(category) {
    const { name } = category;
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.BOOKS)
                      .find({ 'category.name': name }).toArray();
    return response;
  }

  async getOneBook(id) {
    const { ObjectID } = this.request.mongo;
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.BOOKS)
                      .findOne({ _id: new ObjectID(id) });
    return response;
  }

  async addBook(book) {
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.BOOKS)
                      .insertOne(book);
    return response;
  }

  async deleteBook(id) {
    const { ObjectID } = this.request.mongo;
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.BOOKS)
                      .deleteOne({ _id: new ObjectID(id) });
    return response;
  }

  async updateBook(id, book) {
    const { ObjectID } = this.request.mongo;
    const response = await this.request.mongo.db
                      .collection(COLLECTIONS.BOOKS)
                      .updateOne({ _id: new ObjectID(id) }, { $set: book });
    return response;
  }
}

module.exports = BooksController;