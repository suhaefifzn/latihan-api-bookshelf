class UsersResponses {
  constructor(h) {
    this.h = h;
  }

  notFound() {
    const response = this.h.response({
      status: 'fail',
      message: 'User tidak ditemukan',
    });
    response.code(404);
    return response;
  }

  userFound(user) {
    const {
      username,
      name,
      email,
      admin,
    } = user;
    const response = this.h.response({
      status: 'success',
      data: {
        user: {
          username,
          name,
          email,
          admin,
        },
      },
    });

    response.code(200);
    return response;
  }

  allUsersFound(users) {
    const response = this.h.response({
      status: 'success',
      data: {
        users: users.map((user) => {
          return {
            username: user.username,
            name: user.name,
            email: user.email,
          };
        }),
      },
    });

    response.code(200);
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

  hasBeenDeleted() {
    const response = this.h.response({
      status: 'success',
      message: 'User berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  hasBeenAdded() {
    const response = this.h.response({
      status: 'success',
      message: 'Berhasil menambahkan user',
    });

    response.code(200);
    return response;
  }

  serverError() {
    const response = this.h.response({
      status: 'fail',
      message: 'Internal server error',
    });

    response.code(500);
    return response;
  }

  propertyValueNotValid() {
    const response = this.h.response({
      status: 'fail',
      message: 'Gagal menambahkan user.'
                + ' Name, username, email, atau password tidak boleh kosong',
    });

    response.code(400);
    return response;
  }

  usernameOrEmailAlreadyTaken() {
    const response = this.h.response({
      status: 'fail',
      message: 'Gagal menambahkan user. Username atau email telah digunakan',
    });

    response.code(400);
    return response;
  }
}

module.exports = UsersResponses;