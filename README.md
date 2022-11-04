# LATIHAN RESTFUL API BOOKSHELF APP
Versi Node.JS yang saya gunakan adalah 14.17.0.
<br><br>
Proyek ini merupakan latihan mandiri membuat restful api menggunakan Node.JS, Hapi, dan MongoDB. Anda bisa menggunakan, memodifikasi, dan lainnya untuk keperluan latihan RESTful API dengan JavaScript. Saya menyadari masih banyak kekurangan dari kode yang saya susun dan saya meyakini selama saya terus berproses dan belajar maka suatu saat bisa menjadi lebih baik lagi.

###### DAFTAR ISI
1. [SIAPKAN FILE .ENV](#siapkan-file-env)
2. [BUAT DATABASE MONGODB](#buat-database-mongodb)
3. [PERBEDAAN LEVEL AKUN](#perbedaan-level-pada-akun)
4. [URL ENDPOINT](#url-endpoint)

Sebenarnya saya sudah men-deploy hasil latihan RESTful API ini dan dapat diakses pada [https://bookshelf-api.herokuapp.com](https://bookshelf-api.herokuapp.com/login) akan tetapi kemungkinan besar hanya dapat diakses sampai tanggal 28 November 2022.

Saya menyarankan untuk selalu menggunakan headers berikut untuk setiap kali mengakses *url endpoint*:
<br>
```
headers: {
  "Authorization": "Bearer PersonalBookshelf03112022",
  "Content-Type": "application/json",
}
```
Jika ingin menjalankan proyek ini pada localhost secara penuh, saya menyarankan untuk memasang MongoDB Community Server beserta MongoDB Compass-nya.
Jangan lupa untuk melakukan ***npm install*** untuk memasang setiap package yang diperlukan.
<br><br>
### SIAPKAN FILE .ENV
Buatlah file **.env** pada root folder atau berada pada level yang sama dengan **package.json**, sesuaikan dan isi file **.env** tersebut seperti yang tertera pada **.env.example**.
<br>Contohnya seperti berikut:
```
MONGODB_URL="mongodb+srv://<username>:<password>@latihan.kujiwhp.mongodb.net/<nama_database>?retryWrites=true&w=majority"
COOKIE_NAME="bookshelf-cookie*"
COOKIE_PASSWORD="COOKIE_PASSWORD_MINIMAL_32_CHARACTERS"
HOST="localhost"
```
Jika databasenya dijalankan di localhost, isi **MONGODB_URL** dengan *mongodb://localhost:{port}/{nama_database}*.
<br><br>
### BUAT DATABASE MONGODB
Buatlah satu database MongoDB dan sesuaikan nama database tersebut sesuai dengan nama database yang digunakan pada **MONGODB_URL**.
Buatlah empat koleksi database dengan nama:
+ ***users***
+ ***token***
+ ***books***
+ ***categories***

Agar lebih cepat, saya menyarankan Anda untuk mengimport setiap koleksi yang telah saya sediakan pada folder **MONGODB_COLLECTION**. Import setiap file .json sesuai dengan nama koleksi yang telah dibuat.
Dalam koleksi ***users*** terdapat dua akun dengan level yang berbeda, Anda dapat melihat masing-masing *username* dan *password* yang siap digunakan pada file **users.txt**.
<br><br>
### PERBEDAAN LEVEL PADA AKUN
Akun dengan level tertinggi ditandai dengan property *admin* bernilai 1, biasanya saya menyebutnya sebagai *superadmin*.
Level *superadmin* memiliki beberapa kemampuan:
+ Membuat user baru dengan level admin default bernilai 0 yang berarti hanya admin biasa
+ Melihat daftar user yang terdapat pada koleksi ***users***
+ Melihat beberapa informasi seperti *name*, *username*, *email*, dan level *admin*
+ Menghapus user yang memiliki property *admin* bernilai 0
+ Proses CRUD pada koleksi ***books***, hanya dapat *create*, *update* dan *delete* untuk diri sendiri

Jenis akun kedua ditandai dengan property *admin* bernilai 0, saya menyebutnya sebagai *adminbiasa*.
Level *adminbiasa* tidak memiliki kemampuan untuk mengakses koleksi ***users***, kemampuan lainnya:
+ Proses CRUD pada koleksi ***books***, hanya dapat *create*, *update* dan *delete* untuk diri sendiri

Setiap level memiliki kemampuan untuk *read* pada koleksi ***books***, baik *read* buku diri sendiri ataupun *read* buku dari semua akun.
<br><br>
### URL ENDPOINT
Url endpoint berikut tidak memerlukan autentikasi:
> **/login**
method: 'GET', menampilkan message: *'Silahkan login dengan username dan password yang sudah terdaftar'*.

> **/login**
method: 'POST', digunakan untuk mengirim data *body* yang menerima dua nilai property *username* dan *password*. Jika kedua nilai properti tersebut valid atau sesuai dengan data pada koleksi users maka akan diredirect ke url **/welcome** dan akan membuat sebuah cookie, contoh *body*:
>```
>body: {
>  "username": "username_akun",
>  "password": "password_akun"
>}
>```
<br>Beberapa url endpoint berikut memerlukan autentikasi bearer token yang disimpan pada bagian *headers* saat akan melakukan request-nya, contoh format *headers* seperti yang tertera pada paragraf paling atas.
> **/books**
method: 'GET', digunakan untuk mendapatkan semua buku dari koleksi ***books***.

> **/books/*{bookId}***
method: 'GET', digunakan untuk mendapatkan satu buku secara detail menggunakan *bookId* yang terdaftar pada koleksi ***books***. 

> **/books/category/*{categoryName}***
method: 'GET', digunakan untuk mendapatkan semua buku berdasarkan bada nama kategori yang simpan pada *categoryName*.

> **/categories**
method: 'GET', digunakan untuk mendapatkan semua kategori yang tersedia pada koleksi ***categories***.

> **/categories/*{categoryId}***
method: 'GET', digunakan untuk mendapatkan satu kategori berdasarkan pada *categoryId* yang diberikan.

<br>Beberapa url berikut memerlukan autentikasi cookie/dapat diakses bila telah berhasil login, untuk login sendiri sudah dijelaskan pada paragraf pertama di sub-bab mengenai url endpoint.
> **/books/my**
method: 'GET', digunakan untuk mendapatkan semua buku yang pernah dibuat oleh akun yang digunakan untuk login.

> **/books**
method: 'POST', digunakan untuk menambahkan buku baru. Isikan data-data berikut pada *body* dan pastikan tidak ada yang kosong atau terlewat.
>```
>body: {
>  "title": "judul buku",
>  "year": "tahun buku diterbitkan",
>  "author": "nama penulis buku",
>  "publisher": "penerbit buku",
>  "categoryId": "satu id kategori buku",
>  "body": "dapat diisikan dengan data berupa sinopsis buku"
>}
>```

> **/books/*{bookId}***
method: 'PUT', digunakan untuk memperbarui/update buku berdasarkan pada *bookId* atau *id* buku. Pengguna yang login hanya dapat memperbarui buku yang pernah dibuat olehnya dan tidak dapat memperbarui buku yang dibuat oleh akun yang lain. Nilai-nilai yang dapat diperbarui sama seperti nilai pada *body* yang tertera diatas.

> **/books/*{bookId}***
method: 'DELETE', digunakan untuk menghapus buku dari koleksi ***books*** berdasarkan *bookId* atau *id* buku. Pengguna yang login hanya dapat menghapus buku yang pernah dibuat olehnya dan tidak dapat menghapus buku yang dibuat oleh akun yang lain. 

<br>Beberapa url berikut memerlukan autentikasi cookie dan hanya dapat diakses oleh akun dengan level *superadmin* atau properti *admin* bernilai 1.
> **/users**
method: 'GET', digunakan untuk mendapatkan data semua user yang tersedia pada koleksi ***users***, kecuali data *password*.

> **/users/*{username}***
method: 'GET', digunakan untuk mendapatkan data mengenai satu user berdasarkan pada *username*. Kecuali data *password*.

> **/users/*{username}***
method: 'DELETE', digunakan untuk menghapus satu user berdasarkan pada *username* yang dikirimkan.

> **/users**
method: 'POST', digunakan untuk menambahkan satu user baru dengan level *adminbiasa*, data yang disimpan pada body seperti contoh berikut:
>```
>body: {
>  "name": "nama pengguna",
>  "username": "nama_pengguna_yang_digunakan_untuk_login_dan_bersifat_unik",
>  "email": "email aktif pengguna",
>  "password: "password untuk akun pengguna bersifat rahasia dan terenkripsi"
>}
>```

> **/categories**
method: 'POST', digunakan untuk menambahkan kategori baru dengan format:
>```
>body: {
>  "name": "nama kategori"
>}
>```

> **/categories/*{categoryId}***
method: 'PUT', digunakan untuk memperbarui kategori berdasarkan pada *categoryId* atau *id* kategori. Format body sama seperti diatas.


### NOTES
Dokumentasi sini masih belum selesai dan proyek latihan ini akan diperbarui secara perlahan.
