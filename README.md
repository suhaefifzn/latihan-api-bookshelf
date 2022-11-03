# LATIHAN RESTFUL API BOOKSHELF APP
Proyek ini merupakan latihan mandiri membuat restful api menggunakan Node.JS, Hapi, dan MongoDB.
<br>Versi Node.JS yang digunakan 14.17.0.
<br><br>
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
Jika databasenya dijalankan di localhost, isi **MONGODB_URL** dengan ***mongodb://localhost:{port}/{nama_database}***.
<br><br>
### BUAT DATABASE MONGODB
Buatlah satu database MongoDB dan sesuaikan nama database tersebut sesuai dengan nama database yang digunakan pada ***MONGODB_URL***.
Buatlah empat koleksi database dengan nama:
+ users
+ token
+ books
+ categories

Agar lebih cepat, saya menyarankan Anda untuk mengimport setiap koleksi yang telah saya sediakan pada folder **MONGODB_COLLECTION**. Import setiap file .json sesuai dengan nama koleksi yang telah dibuat.
Dalam koleksi ***users*** terdapat dua akun dengan level yang berbeda, Anda dapat melihat masing-masing *username* dan *password* yang siap digunakan pada file **users.txt**.
<br><br>
### PERBEDAAN LEVEL PADA AKUN
Akun dengan level tertinggi ditandai dengan property *admin* bernilai 1, biasanya saya menyebutnya sebagai ***superadmin***.
Level ***superadmin*** memiliki beberapa kemampuan:
+ Membuat user baru dengan level admin default bernilai 0 yang berarti hanya admin biasa
+ Melihat daftar user yang terdapat pada koleksi ***users***
+ Melihat beberapa informasi seperti *name*, *username*, *email*, dan level *admin*
+ Menghapus user yang memiliki property *admin* bernilai 0
+ Proses CRUD pada koleksi ***books***, hanya dapat *create*, *update* dan *delete* untuk diri sendiri

Jenis akun kedua ditandai dengan property *admin* bernilai 0, saya menyebutnya sebagai ***adminbiasa***.
Level ***adminbiasa*** tidak memiliki kemampuan untuk mengakses koleksi ***users***, kemampuan lainnya:
+ Proses CRUD pada koleksi ***books***, hanya dapat *create*, *update* dan *delete* untuk diri sendiri

Setiap level memiliki kemampuan untuk *read* pada koleksi ***books***, baik *read* buku diri sendiri ataupun *read* buku dari semua akun.
<br><br>
### URL ENDPOINT
*Url endpoint* berikut tidak memerlukan autentikasi:

+ **/login**
method: 'GET', menampilkan message: 'Silahkan login dengan username dan password yang sudah terdaftar'.
+ **/login**
method: 'POST', digunakan untuk mengirim data body yang menerima dua nilai property *username* dan *password*. Jika kedua nilai properti tersebut valid atau sesuai dengan data pada koleksi users maka akan diredirect ke *url* **/welcome**.

<br>Beberapa *url endpoint* berikut memerlukan autentikasi bearer token yang disimpan pada bagian *headers* saat akan melakukan *request*-nya.
```
headers: {
  "Authorization": "Bearer PersonalBookshelf03112022",
  "Content-Type": "application/json",
}
```
+ **/books**
method: 'GET', digunakan untuk mendapatkan semua buku dari koleksi ***books***.
+ **/books/category/{categoryName}**
method: 'GET', digunakan untuk mendapatkan semua buku berdasarkan bada nama kategori yang simpan pada *{categoryName}*.

<br><br>
### NOTES
Dokumentasi sini masih belum selesai dan proyek latihan ini akan diperbarui secara perlahan.
