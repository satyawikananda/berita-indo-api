import { Request, Response } from 'express'
import { RSS_SUARA } from '../../../const'
import { TypeSuara, DataResponse } from '../../../types/common'
import { replaceQueryParams } from '../../../utils/replaceQueryParams'
import { parserRss } from '../../../utils/parser'

interface Params {
  type?: TypeSuara
}

class SuaraNews {
  static async getNews(req: Request, res: Response) {
    try {
      const { type }: Partial<Params> = req.params
      const url = RSS_SUARA.replace('{type}', type)
      const result = await parserRss(url)
      const data = result.items.map((items) => {
        const image = replaceQueryParams(items.enclosure.url, 'q', '100')
        delete items.pubDate
        delete items.content
        delete items.guid
        delete items.categories
        items.image = {
          small: items.enclosure.url,
          large: image
        }
        delete items.enclosure
        return items
      })
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of type ${type} in Suara News`,
        total: data.length,
        data: data
      }
      return res.status(200).send(dataResponse)
    } catch (e) {
      return res.status(500).send({
        message: `${e.message}`
      })
    }
  }

  static async getAllNews(req: Request, res: Response) {
    try {
      const url = RSS_SUARA.replace('/{type}', '')
      const result = await parserRss(url)
      const data = result.items.map((items) => {
        const image = replaceQueryParams(items.enclosure.url, 'q', '100')
        delete items.pubDate
        delete items.content
        delete items.guid
        delete items.categories
        items.image = {
          small: items.enclosure.url,
          large: image
        }
        delete items.enclosure
        return items
      })
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of all news in Suara News`,
        total: data.length,
        data: data
      }
      return res.status(200).send(dataResponse)
    } catch (error) {
      return res.status(500).send({
        message: `${error.message}`
      })
    }
  }
}

export default SuaraNews
