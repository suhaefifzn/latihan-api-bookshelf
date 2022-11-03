/* eslint-disable no-underscore-dangle */
class BooksResponses {
  constructor(h) {
    this.h = h;
  }

  valueIsEmpty() {
    const response = this.h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Judul dan author tidak boleh kosong',
    });

    response.code(400);
    return response;
  }

  successfullyAdded(id) {
    const response = this.h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(200);
    return response;
  }

  failedToAdd() {
    const response = this.h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });

    response.code(500);
    return response;
  }

  allBooksFound(books = []) {
    const response = this.h.response({
      status: 'success',
      data: {
        books: books.map((book) => {
          return {
            id: book._id,
            title: book.title,
            author: book.author,
            category: book.category.name,
            overview: book.overview,
          };
        }),
      },
    });

    response.code(200);
    return response;
  }

  oneBookFound(book) {
    const response = this.h.response({
      status: 'success',
      data: {
        book: {
          id: book._id,
          title: book.title,
          author: book.author,
          year: book.year,
          publisher: book.publisher,
          category: book.category,
          addedBy: book.addedBy,
          body: book.body,
          insertedAt: book.insertedAt,
          updatedAt: book.updatedAt,
        },
      },
    });

    response.code(200);
    return response;
  }

  serverError() {
    const response = this.h.response({
      status: 'fail',
      message: 'Server error',
    });

    response.code(500);
    return response;
  }

  notFound() {
    const response = this.h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  successfullyDeleted(id) {
    const response = this.h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
      data: {
        bookId: id,
      },
    });

    response.code(200);
    return response;
  }

  successfullyUpdated(id) {
    const response = this.h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        book: id,
      },
    });

    response.code(200);
    return response;
  }

  categoryIsEmpty() {
    const response = this.h.response({
      status: 'fail',
      message: 'Nama kategori tidak boleh kosong',
    });

    response.code(400);
    return response;
  }

  accessDenied() {
    const response = this.h.response({
      status: 'fail',
      message: 'Akses ditolak',
    });

    response.code(403);
    return response;
  }
}

module.exports = BooksResponses;