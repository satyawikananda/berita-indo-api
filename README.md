<div align="center">
<h1>Berita Indo API</h1>

<p>An api to display news in Indonesia</p>

![berita-indo-api](https://socialify.git.ci/satyawikananda/berita-indo-api/image?description=1&forks=1&issues=1&logo=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F26%2F91%2Ff2%2F2691f2fa1a0f078f5f274edf7fea6763.png&owner=1&pulls=1&stargazers=1&theme=Light)

</div>

> Dokumentasi untuk bahasa indonesia. [Klik disini](./README-ID.md)

## Description

Berita Indo API (or in English is Indonesian News API) is an API to display many news Indonesia like from CNN News, CNBC News, etc. For the datas was parsed from the RSS feed to JSON type and also Rest API. For the routes, you can see it below.

## List Routes Berita Indo API

- `/` : Get all list and info about this API
- `/v1/cnn-news` : Get all news data of CNN News
- `/v1/cnn-news/:type` : Get specific news data by type news of CNN News
- `/v1/cnbc-news/` : Get all news data of CNBC News
- `/v1/cnbc-news/:type` : Get specific news data by type news of CNBC News
- `/v1/republika-news` : Get all news data of Republika News
- `/v1/republika-news/:type` : Get specific news data by type news of Republika News
- `/v1/tempo-news/` : Get all news data of Tempo News
- `/v1/tempo-news/:type` : Get specific news data by type news of Tempo News
- `/v1/antara-news/:type` : Get specific news data by type news of Antara News
- `/v1/kumparan-news/` : Get all news data of Kumparan News
- `/v1/okezone-news` : Get all news data of Okezone News
- `/v1/okezone-news/:type` : Get specific news data by type news of Okezone News

## To-do List

- News
  - [x] CNN News
  - [x] CNBC News
  - [x] Republika News
  - [x] Tempo News
  - [x] Antara News
  - [x] Kumparan News
  - [x] Okezone News
  - [ ] Liputan 6 News
  - [ ] BBC News
  - [ ] Tribun News
- Improve API
  - [ ] Search data news
  - [ ] Paginate data

## Installation

If you want to add this project in your own machine, you can install this project by following the step below

1. Clone this repository

```
git clone https://github.com/satyawikananda/berita-indo-api.git
```

2. Install dependencies

In my case, i'm using pnpm for package manager, you can adjust with your favorite package manager

```
pnpm install
```

> To running my program, you can use command `ts-node ./api/server.ts` in your terminal

## Tech Stack

For the tech stack, Berita Indo API was using :

1. Typescript
2. Node JS
3. Express
4. RSS Parser
5. Vercel
6. and many utilities

# Showcase

If you use this API to your project application, you can register your project in this showcase below :

# Support Me

You can support me on [Karya Karsa](https://karyakarsa.com/satyawikananda) and [Trakteer](https://trakteer.id/satya-wikananda/)

# Contribution

Want to make this project better? You can contribute this project, I am very open if there are contributions to this project.

---

![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)

Powered by Typescipt and vercel. Code licensed under [MIT License](https://raw.githubusercontent.com/satyawikananda/berita-indo-api/main/LICENSE?token=AH44ZFF4GHAMNS4WIL4FCC3ADZ4F6).
