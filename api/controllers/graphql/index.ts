import { gql } from 'apollo-server-express';
import {ListsApi} from '../../../types/common'

export const typeDefs = gql`
  type listsApi {
    label: String
    all: String
    type: String
    listType: [String]
  }

  type Query {
    listsApi: [listsApi]
  }
`;

const listsApi: ListsApi[] = [
  {
    label: 'CNN News',
    all: 'https://berita-indo-api.vercel.app/v1/cnn-news/',
    type: 'https://berita-indo-api.vercel.app/v1/cnn-news/:type',
    listType: [
      'nasional',
      'internasional',
      'ekonomi',
      'olahraga',
      'teknologi',
      'hiburan',
      'gaya-hidup',
    ],
    example: 'https://berita-indo-api.vercel.app/v1/cnn-news/ekonomi',
  },
  {
    label: 'CNBC News',
    all: 'https://berita-indo-api.vercel.app/v1/cnbc-news/',
    type: 'https://berita-indo-api.vercel.app/v1/cnbc-news/:type',
    listType: [
      'market',
      'investment',
      'news',
      'entrepreneur',
      'syariah',
      'tech',
      'lifestyle',
    ],
    example: 'https://berita-indo-api.vercel.app/v1/cnbc-news/syariah',
  },
  {
    label: 'Republika News',
    all: 'https://berita-indo-api.vercel.app/v1/republika-news/',
    type: 'https://berita-indo-api.vercel.app/v1/republika-news/:type',
    listType: [
      'news',
      'nusantara',
      'khazanah',
      'islam-digest',
      'internasional',
      'ekonomi',
      'sepakbola',
      'leisure',
    ],
    example:
      'https://berita-indo-api.vercel.app/v1/republika-news/islam-digest',
  },
  {
    label: 'Tempo News',
    all: 'https://berita-indo-api.vercel.app/v1/tempo-news/',
    type: 'https://berita-indo-api.vercel.app/v1/tempo-news/:type',
    listType: [
      'nasional',
      'bisnis',
      'metro',
      'dunia',
      'bola',
      'sport',
      'cantik',
      'tekno',
      'otomotif',
      'nusantara',
    ],
    example: 'https://berita-indo-api.vercel.app/v1/tempo-news/bisnis',
  },
  {
    label: 'Antara News',
    type: 'https://berita-indo-api.vercel.app/v1/antara-news/:type',
    listType: [
      'terkini',
      'top-news',
      'politik',
      'hukum',
      'ekonomi',
      'metro',
      'sepakbola',
      'olahraga',
      'humaniora',
      'lifestyle',
      'hiburan',
      'dunia',
      'infografik',
      'tekno',
      'otomotif',
      'warta-bumi',
      'rilis-pers',
    ],
    example: 'https://berita-indo-api.vercel.app/v1/antara-news/hukum',
  },
  {
    label: 'Okezone News',
    all: 'https://berita-indo-api.vercel.app/v1/okezone-news',
    listType: [
      'breaking',
      'sport',
      'economy',
      'lifestyle',
      'celebrity',
      'bola',
      'techno',
    ],
    example: 'https://berita-indo-api.vercel.app/v1/okezone-news/bola',
  },
  {
    label: 'BBC News',
    all: 'https://berita-indo-api.vercel.app/v1/bbc-news',
    listType: [
      'dunia',
      'berita_indonesia',
      'olahraga',
      'majalah',
      'multimedia',
    ],
    example: 'https://berita-indo-api.vercel.app/v1/bbc-news/dunia',
  },
  {
    label: 'Kumparan News',
    all: 'https://berita-indo-api.vercel.app/v1/kumparan-news',
  },
  {
    label: 'Liputan 6 News',
    all: 'https://berita-indo-api.vercel.app/v1/liputan6-news',
  },
  {
    label: 'Vice',
    all: 'https://berita-indo-api.vercel.app/v1/vice',
  },
];

export const resolvers = {
  Query: {
    listsApi: () => listsApi,
  },
};
