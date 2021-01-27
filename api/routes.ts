import { Router } from 'express'
import BeritaIndo from './controllers/index'

const router: Router = Router()

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