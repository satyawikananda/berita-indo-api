import { Request, Response } from "express"
import { parserRss } from "../../../utils/parser"
import { replaceQueryParams } from "../../../utils/replaceQueryParams"
import { RSS_CNN_NEWS } from "../../../const"
import { TypeCnn, DataResponse } from "../../../types/common"
import { useSearch } from "../../../utils/useSearch"

interface Params {
  type?: TypeCnn
}

interface Title {
  title: string
}
class CnnNews {
  static async getNews(req: Request, res: Response) {
    try {
      const { type }: Partial<Params> = req.params
      const { title }: Partial<Title> = req.query
      const url = RSS_CNN_NEWS.replace("{type}", type)
      const result = await parserRss(url)
      const data = result.items.map((items) => {
        const image = replaceQueryParams(items.enclosure.url, "q", "100")
        delete items.pubDate
        delete items["content:encoded"]
        delete items["content:encodedSnippet"]
        delete items.content
        delete items.guid
        items.image = {
          small: items.enclosure.url,
          large: image,
        }
        delete items.enclosure
        return items
      })
      if (title !== undefined) {
        const search = useSearch(data, title)
        let dataSearch: any = []
        search.map((items) => {
          dataSearch.push(items.item)
        })
        const dataResponse: DataResponse = {
          code: 200,
          status: "OK",
          messages: `Result of type ${type} news in CNN News with title search: ${title}`,
          total: search.length,
          data: dataSearch,
        }

        return res.status(200).send(dataResponse)
      }
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of type ${type} news in CNN News`,
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

  static async getAllNews(req: Request, res: Response) {
    try {
      const { title }: Partial<Title> = req.query
      const url = RSS_CNN_NEWS.replace("/{type}", "")
      const result = await parserRss(url)
      const data = result.items.map((items) => {
        const image = replaceQueryParams(items.enclosure.url, "q", "100")
        delete items.pubDate
        delete items["content:encoded"]
        delete items["content:encodedSnippet"]
        delete items.content
        delete items.guid
        items.image = {
          small: items.enclosure.url,
          large: image,
        }
        delete items.enclosure
        return items
      })
      if (title !== undefined) {
        const search = useSearch(data, title)
        let dataSearch: any = []
        search.map((items) => {
          dataSearch.push(items.item)
        })
        const dataResponse: DataResponse = {
          code: 200,
          status: "OK",
          messages: `Result of all news in CNN News with title search: ${title}`,
          total: search.length,
          data: dataSearch,
        }

        return res.status(200).send(dataResponse)
      }
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of all news in CNN News`,
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

export default CnnNews
