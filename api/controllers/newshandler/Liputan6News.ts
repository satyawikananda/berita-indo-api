/*
    This RSS feed maybe isn't available again
    and this API will be unused
*/

import { Response } from "express"
import { parserRss } from "../../../utils/parser"
import { RSS_LIPUTAN6 } from "../../../const"
import { DataResponse } from "../../../types/common"

const limitString = (str: string, limit: number): string => {
  const string: string = str
  const length: number = limit
  const result: string = string.length > length ? string.substring(0, length) + "...." : string
  return result
}

class Liputan6News {
  static async getAllNews(_, res: Response) {
    try {
      const url = RSS_LIPUTAN6
      const result = await parserRss(url)
      const data = result.items.map((items) => {
        items.image = {
          small: items.enclosure.url,
        }
        items.description = limitString(items.contentSnippet, 300)
        delete items.contentSnippet
        delete items.pubDate
        delete items.enclosure
        delete items.content
        delete items.guid
        return items
      })
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of all news in Liputan 6 News`,
        total: data.length,
        data: data,
      }
      return res.status(200).send(dataResponse)
    } catch (e) {
      return res.status(500).send({
        message: `${e.message}`,
      })
    }
  }
}

export default Liputan6News
