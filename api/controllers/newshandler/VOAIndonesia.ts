import { Request, Response } from 'express'
import { RSS_VOA } from "../../../const"
import { DataResponse } from '../../../types/common'
import { parserRss } from '../../../utils/parser'

const limitString = (str: string, limit: number): string => {
  const string: string = str
  const length: number = limit
  const result: string = string.length > length ? string.substring(0, length) + '....' : string;
  return result
}


class VOAIndonesia {
  static async getAllNews(req: Request, res: Response) {
    try {
      const url = RSS_VOA
      const result = await parserRss(url)
      const data = result.items.map((items) => {
        items.description = limitString(items.contentSnippet, 450)
        items.image = {
          small: items.enclosure.url
        }
        delete items.creator
        delete items.contentSnippet
        delete items.pubDate
        delete items.author
        delete items['content:encoded']
        delete items['content:encodedSnippet']
        delete items.content
        delete items.guid
        delete items.categories
        delete items.enclosure
        delete items.comments
        return items
      })
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of all news in VOA Indonesia`,
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

export default VOAIndonesia