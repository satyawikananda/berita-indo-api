<div align="center">
<h1>Berita Indo API</h1>

<p>Sebuah API untuk menampilkan berita Indonesia</p>

![berita-indo-api](https://socialify.git.ci/satyawikananda/berita-indo-api/image?description=1&forks=1&issues=1&logo=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F26%2F91%2Ff2%2F2691f2fa1a0f078f5f274edf7fea6763.png&owner=1&pulls=1&stargazers=1&theme=Light)

</div>

## Deskripsi

Berita Indo API adalah sebuah API yang menampilkan banyak berita di Indonesia seperti berita dari Berita CNN, Berita CNBC, dll. Untuk datanya sendiri sudah di urai dari umpan RSS (Really Simple Syndication) ke tipe JSON Rest API. Untuk `routing` nya, bisa lihat di bawah ini.

## Daftar Routes Berita Indo API

- `/` : Mendapatkan seluruh daftar dan info tentang API ini.
- `/v1/cnn-news` : Mendapatkan seluruh berita terkini dari Berita CNN.
- `/v1/cnn-news/:type` : Mendapatkan data berita secara spesifik dari tipe berita di Berita CNN.
- `/v1/cnbc-news/` : Mendapatkan seluruh berita terkini dari Berita CNBC.
- `/v1/cnbc-news/:type` : Mendapatkan data berita secara spesifik dari tipe berita di Berita CNBC.
- `/v1/republika-news` : Mendapatkan seluruh berita terkini dari Berita Republika.
- `/v1/republika-news/:type` : Mendapatkan data berita secara spesifik dari tipe berita di Berita Republika.
- `/v1/tempo-news/` : Mendapatkan seluruh berita terkini dari Berita Tempo.
- `/v1/tempo-news/:type` : Mendapatkan data berita secara spesifik dari tipe berita di Berita Tempo.
- `/v1/antara-news/:type` : Mendapatkan data berita secara spesifik dari tipe berita di Berita Antara.
- `/v1/kumparan-news/` : Mendapatkan seluruh berita terkini dari Berita Kumparan
- `/v1/okezone-news` : Mendapatkan seluruh berita terkini dari Berita Okezone.
- `/v1/okezone-news/:type` : Mendapatkan data berita secara spesifik dari tipe berita di Berita Okezone.
- `/v1/liputan6-news` : Mendapatkan seluruh berita terkini dari Berita Liputan 6.
- `/v1/bbc-news/` : Mendapatkan seluruh berita terkini dari Berita BBC.
- `/v1/bbc-news/:type/` : Mendapatkan data berita secara spesifik dari tipe berita di Berita BBC.
- `/v1/tribun-news`: Mendapatkan seluruh berita terkini dari Berita Tribun.
- `/v1/tribun-news/:type` : Mendapatkan data berita secara spesifik dari tipe berita di Berita Tribun.
- `/v1/jawa-pos/:type`: Mendapatkan seluruh berita terkini dari Berita Jawa Pos
- `/v1/jawa-pos/:type`: Mendapatkan data berita secara spesifik dari tipe berita di Berita Jawa Pos
- `/v1/vice/`:  Mendapatkan seluruh berita terkini dari Vice Indonesia
- `/v1/suara/`:  Mendapatkan seluruh berita terkini dari Berita Suara
- `/v1/suara/:type`:  Mendapatkan data berita secara spesifik dari tipe berita di Berita SUARA
- `/v1/voa/`:  Mendapatkan seluruh berita terkini dari VOA Indonesia

## Daftar yang harus dilakukan

- Berita
  - [x] Berita CNN
  - [x] Berita CNBC
  - [x] Berita Republika
  - [x] Berita Tempo
  - [x] Berita Antara
  - [x] Berita Kumparan
  - [x] Berita Okezone
  - [x] ~~Berita Liputan 6~~ (API berita ini mungkin tidak tersedia lagi, dikarenakan ada isu RSS dari Liputan6)
  - [x] Berita BBC
  - [x] Berita Tribun
  - [x] Berita Jawa Pos  
  - [x] Vice 
  - [x] Berita Suara 
  - [x] VOA Indonesia 
- Tingkatkan API
  - [x] Cari data berita
  - [ ] Memberikan halaman pada data API

## Instalasi

Jika Anda ingin menambahkan projek ini di komputer Anda sendiri, Anda bisa melakukan instalasi dengan mengikuti cara dibawah ini

1. klon repositori ini

```
git clone https://github.com/satyawikananda/berita-indo-api.git
```

2. Unduh `dependencies`

Di kasus saya, saya menggunakan `pnpm` untuk `package manager`, Anda bisa menyesuaikan dengan `package manager` kesukaan Anda.

```
pnpm install
```

> To running my program, you can use command `ts-node ./api/server.ts` in your terminal
> Untuk mengeksekusi program saya, Anda bisa menggunakan perintah `ts-node ./api/server.ts` di dalam terminal.

## Teknologi yang dipakai

Untuk teknologi-nya, projek ini menggunakan:

1. Typescript
2. Node JS
3. Express
4. RSS Parser
5. Vercel
6. dan bantuan lainnya

# Pamer Projek

Jika Anda menggunakan API ini di aplikasi Anda, Anda bisa mendaftarkan projek Anda di bawah ini :

- [Berita.id](https://github.com/NicolaDonoastro/berita.id) Platform berita minimalis oleh [NicolaDonoastro](https://github.com/NicolaDonoastro)
- [Mobile News App](https://github.com/indrapalijama/mobile-news-platform) Aplikasi Mobile menggunakan Ionic oleh [Indrapalijama](https://github.com/indrapalijama)
# Dukung saya

Anda bisa mendukung saya di [Karya Karsa](https://karyakarsa.com/satyawikananda) dan [Trakteer](https://trakteer.id/satya-wikananda/)

# Kontribusi

Ingin projek ini jadi lebih baik? Anda bisa kontribusi ke projek ini, saya sangat terbuka jika ada kontribusi di projek ini.

---

![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)

Dibuat menggunakan Typescipt dan vercel. Kode berlisensi dibawah [MIT License](https://raw.githubusercontent.com/satyawikananda/berita-indo-api/main/LICENSE?token=AH44ZFF4GHAMNS4WIL4FCC3ADZ4F6).
