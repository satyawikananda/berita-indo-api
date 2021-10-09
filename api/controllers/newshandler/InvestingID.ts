

import { Request, Response } from 'express'
import { RSS_INVEST } from "../../../const"
import { DataResponse, TypeInvestingID } from '../../../types/common'
import { parserRss } from '../../../utils/parser'

const filterURL = (str: string): { url: string, display: string } => {
  var rss_url: string;
  var display: string;
  switch (str) {
    case 'forex':
      rss_url = 'news_1'
      display = 'Forex'
      break;
    case 'populer':
      rss_url = 'news_285'
      display = 'Populer'
      break;
    case 'politik':
      rss_url = 'news_289'
      display = 'Politik'
      break;
    case 'komoditasberjangka':
      rss_url = 'news_11'
      display = 'Komoditas & Berjangka'
      break;
    case 'saham':
      rss_url = 'news_25'
      display = 'Pasar Saham'
      break;
    case 'indikatorekonomi':
      rss_url = 'news_95'
      display = 'Indikator Ekonomi'
      break;
    case 'ekonomi':
      rss_url = 'news_12'
      display = 'Ekonomi'
      break;
    default:
      rss_url = '204'
      display = str
      break;
  }
  return {
    url: rss_url,
    display: display
  }
}

interface Params {
  type?: TypeInvestingID
}

class InvestingID {
  static async getNews(req: Request, res: Response) {
    try {
      const { type }: Partial<Params> = req.params
      const rss_url = filterURL(type)
      if (rss_url.url == '204') {
        const dataResponse: DataResponse = {
          code: 200,
          status: "Type not found",
          messages: `Result of type ${rss_url.display} in Investing Indonesia was not found, please check the docs in the url below for the list of available types`,
          url: 'https://berita-indo-api.vercel.app'
        }
        return res.status(200).send(dataResponse)
      } else {
        const url = RSS_INVEST.replace('{type}', rss_url.url) + '.rss'
        console.log('url', url)
        const result = await parserRss(url)
        console.log('result', result)
        const data = result.items.map((items) => {
          items.image = {
            small: items.enclosure.url
          }
          delete items.creator
          delete items.pubDate
          delete items.author
          delete items.enclosure
          return items
        })
        const dataResponse: DataResponse = {
          code: 200,
          status: "OK",
          messages: `Result of type ${rss_url.display} in Investing Indonesia`,
          total: data.length,
          data: data
        }
        return res.status(200).send(dataResponse)
      }
    } catch (e) {
      return res.status(500).send({
        message: `${e.message}`
      })
    }
  }

  static async getAllNews(req: Request, res: Response) {
    try {
      const url = RSS_INVEST.replace('{type}', 'news.rss')
      const result = await parserRss(url)
      console.log('url', url)
      console.log('result', result)
      const data = result.items.map((items) => {
        items.image = {
          small: items.enclosure.url
        }
        delete items.creator
        delete items.pubDate
        delete items.author
        delete items.enclosure
        return items
      })
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of all news in Investing Indonesia`,
        total: data.length,
        data: data
      }
      return res.status(200).send(dataResponse)
    } catch (error) {
      return res.status(200).send({
        error: `${error}`,
        message: `${error.message}`
      })
    }
  }
}

export default InvestingID