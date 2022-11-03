/* eslint-disable no-underscore-dangle */
class CategoriesResponses {
  constructor(h) {
    this.h = h;
  }

  nameValueNotValid() {
    const response = this.h.response({
      status: 'fail',
      message: 'Name tidak boleh kosong',
    });

    response.code(400);
    return response;
  }

  idValueNotValid() {
    const response = this.h.response({
      status: 'fail',
      message: 'Id tidak boleh kosong',
    });

    response.code(400);
    return response;
  }

  successfullyAdded(id) {
    const response = this.h.response({
      status: 'success',
      message: 'Berhasil menambahkan kategori',
      data: {
        categoryId: id,
      },
    });

    response.code(200);
    return response;
  }

  successfullyUpdated(id) {
    const response = this.h.response({
      status: 'success',
      message: 'Berhasil memperbarui kategori',
      data: {
        categoryId: id,
      },
    });

    response.code(200);
    return response;
  }

  alreadyExist() {
    const response = this.h.response({
      status: 'fail',
      message: 'Name sudah terdaftar',
    });

    response.code(400);
    return response;
  }

  oneCategoryFound(category) {
    const { _id: id, name } = category;
    const response = this.h.response({
      status: 'success',
      data: {
        category: {
          id,
          name,
        },
      },
    });

    response.code(200);
    return response;
  }

  allCategoriesFound(categories = []) {
    const response = this.h.response({
      status: 'success',
      data: {
        categories: categories.map((category) => {
          return {
            id: category._id,
            name: category.name,
          };
        }),
      },
    });

    response.code(200);
    return response;
  }

  notFound() {
    const response = this.h.response({
      status: 'fail',
      message: 'Kategori tidak ditemukan',
    });

    response.code(404);
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

  accessDenied() {
    const response = this.h.response({
      status: 'fail',
      message: 'Akses ditolak',
    });

    response.code(403);
    return response;
  }
}

module.exports = CategoriesResponses;