import { Router, Response } from 'express'
import BeritaIndo from './controllers/index'

const router: Router = Router()

router.get('/', (_, res: Response) => {
    return res.status(200).send({
        listApi: {
            "CNN News": {
                all: "http://berita-indo-api.vercel.app/v1/cnn-news/",
                type: "http://berita-indo-api.vercel.app/v1/cnn-news/:type",
                example: "http://berita-indo-api.vercel.app/v1/cnn-news/ekonomi"
            },
            "CNBC News": {
                all: "http://berita-indo-api.vercel.app/v1/cnbc-news/",
                type: "http://berita-indo-api.vercel.app/v1/cnbc-news/:type",
                example: "http://berita-indo-api.vercel.app/v1/cnbc-news/syariah"
            },
            "Republika News": {
                all: "http://berita-indo-api.vercel.app/v1/republika-news/",
                type: "http://berita-indo-api.vercel.app/v1/republika-news/:type",
                example: "http://berita-indo-api.vercel.app/v1/republika-news/islam-digest"
            },
            "Tempo News": {
                all: "http://berita-indo-api.vercel.app/v1/tempo-news/",
                type: "http://berita-indo-api.vercel.app/v1/tempo-news/:type",
                example: "http://berita-indo-api.vercel.app/v1/tempo-news/bisnis"
            },
            "Antara News": {
                type: "http://berita-indo-api.vercel.app/v1/antara-news/:type",
                example: "http://berita-indo-api.vercel.app/v1/antara-news/hukum"
            },
            "Kumparan News": {
                type: "http://berita-indo-api.vercel.app/v1/kumparan-news",
            },
        },
        author: "Satya Wikananda",
        source: "https://github.com/satyawikananda/berita-indo-api"
    })
})

router.get('/v1/cnn-news/', BeritaIndo.CnnNews.getAllNews)
router.get('/v1/cnn-news/:type', BeritaIndo.CnnNews.getNews)
router.get('/v1/cnbc-news/', BeritaIndo.CnbcNews.getAllNews)
router.get('/v1/cnbc-news/:type', BeritaIndo.CnbcNews.getNews)
router.get('/v1/republika-news/', BeritaIndo.RepublikaNews.getAllNews)
router.get('/v1/republika-news/:type', BeritaIndo.RepublikaNews.getNews)
router.get('/v1/tempo-news/:type', BeritaIndo.TempoNews.getNews)
router.get('/v1/tempo-news/', BeritaIndo.TempoNews.getAllNews)
router.get('/v1/antara-news/:type', BeritaIndo.AntaraNews.getNews)
router.get('/v1/kumparan-news/', BeritaIndo.KumparanNews.getAllNews)


router.all('*', BeritaIndo.notFound)

export default router