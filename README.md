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
- ~~`/v1/liputan6-news` : Get all news data of Liputan 6 News~~ (This RSS feed maybe isn't available again)
- `/v1/bbc-news`: Get all news data of BBC News
- `/v1/bbc-news/:type` : Get specific news data by type news of BBC News
- `/v1/tribun-news`: Get all news data of Tribun News
- `/v1/tribun-news/:zone/:type` : Get specific news data by zone and type news of Tribun News
- `/v1/jawa-pos/:type`: Get all news data of Jawa Pos News
- `/v1/jawa-pos/:type`: Get specific news data by type news of Jawa Pos News
- `/v1/vice/`:  Get all news data of Vice Indonesia
- `/v1/suara/`:  Get all news data of SUARA News
- `/v1/suara/:type`:  Get specific news data by type news of SUARA News
- `/v1/voa/`:  Get all news data of VOA Indonesia

> Each API Endpoint have a query paramaters named 'title', and this query parameters will be usefull if you want to search the API data by the title.

## To-do List

- News
  - [x] CNN News
  - [x] CNBC News
  - [x] Republika News
  - [x] Tempo News
  - [x] Antara News
  - [x] Kumparan News
  - [x] Okezone News
  - [x] ~~Liputan 6 News~~ (This RSS feed maybe isn't available again)
  - [x] BBC News
  - [x] Tribun News
  - [x] Jawa Pos News 
  - [x] Vice 
  - [x] Suara News 
  - [x] VOA Indonesia 
- Improve API
  - [x] Search data news
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

- [Berita.id](https://github.com/NicolaDonoastro/berita.id) Minimalist news platform by [NicolaDonoastro](https://github.com/NicolaDonoastro)
- [Mobile News Platform](https://github.com/indrapalijama/mobile-news-platform) Mobile News Apps using Ionic by [Indrapalijama](https://github.com/indrapalijama)
- [React CNN News](https://github.com/galanggg/react-cnn-news) Simple news app by [Galanggg](https://github.com/galanggg)
- [COnews](https://github.com/maulana2468/COnews) CNN & CNBC Mobile news app by [Maulana2468](https://github.com/maulana2468) 

# Support Me

You can support me on [Karya Karsa](https://karyakarsa.com/satyawikananda) and [Trakteer](https://trakteer.id/satya-wikananda/)

# Contribution

Want to make this project better? You can contribute this project, I am very open if there are contributions to this project.

# Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://satyawikananda.vercel.app"><img src="https://avatars.githubusercontent.com/u/33148052?v=4?s=100" width="100px;" alt=""/><br /><sub><b>I Gusti Ngurah Satya Wikananda</b></sub></a><br /><a href="https://github.com/satyawikananda/berita-indo-api/commits?author=satyawikananda" title="Code">💻</a> <a href="#maintenance-satyawikananda" title="Maintenance">🚧</a> <a href="https://github.com/satyawikananda/berita-indo-api/issues?q=author%3Asatyawikananda" title="Bug reports">🐛</a> <a href="#ideas-satyawikananda" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/satyawikananda/berita-indo-api/commits?author=satyawikananda" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/galanggg"><img src="https://avatars.githubusercontent.com/u/21099312?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Galanggg</b></sub></a><br /><a href="https://github.com/satyawikananda/berita-indo-api/commits?author=galanggg" title="Code">💻</a> <a href="#ideas-galanggg" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/axmad386"><img src="https://avatars.githubusercontent.com/u/8775678?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Akhmad Salafudin</b></sub></a><br /><a href="https://github.com/satyawikananda/berita-indo-api/commits?author=axmad386" title="Code">💻</a> <a href="https://github.com/satyawikananda/berita-indo-api/issues?q=author%3Aaxmad386" title="Bug reports">🐛</a> <a href="#ideas-axmad386" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://kirintux.ninja/"><img src="https://avatars.githubusercontent.com/u/64598048?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Enggar Tivandi</b></sub></a><br /><a href="https://github.com/satyawikananda/berita-indo-api/commits?author=nekoding" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/danar-noverawan-58a850184"><img src="https://avatars.githubusercontent.com/u/39963063?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Danar Noverawan</b></sub></a><br /><a href="https://github.com/satyawikananda/berita-indo-api/commits?author=danarn17" title="Code">💻</a> <a href="https://github.com/satyawikananda/berita-indo-api/commits?author=danarn17" title="Documentation">📖</a></td>
    <td align="center"><a href="http://indrapalijama.github.io"><img src="https://avatars.githubusercontent.com/u/33986004?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Indra Palijama</b></sub></a><br /><a href="https://github.com/satyawikananda/berita-indo-api/commits?author=indrapalijama" title="Code">💻</a> <a href="https://github.com/satyawikananda/berita-indo-api/commits?author=indrapalijama" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)
![vercelbadge](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)

Powered by Typescipt and vercel. Code licensed under [MIT License](https://raw.githubusercontent.com/satyawikananda/berita-indo-api/main/LICENSE?token=AH44ZFF4GHAMNS4WIL4FCC3ADZ4F6).
