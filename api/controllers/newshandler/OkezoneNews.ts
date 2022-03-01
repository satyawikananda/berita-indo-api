import { Request, Response } from "express"
import { replaceQueryParams } from "../../../utils/replaceQueryParams"
import { parserRss } from "../../../utils/parser"
import { RSS_OKEZONE } from "../../../const"
import { TypeOkezone, DataResponse } from "../../../types/common"
import { useSearch } from "../../../utils/useSearch"

interface Params {
  type?: TypeOkezone
}

interface Title {
  title: string
}

class OkezoneNews {
  static async getAllNews(req: Request, res: Response) {
    try {
      const { title }: Partial<Title> = req.query
      const url: string = RSS_OKEZONE.news
      const result = await parserRss(url, {
        item: ["imglink"],
      })
      const data = result.items.map((items) => {
        delete items.pubDate
        delete items.contentSnippet
        delete items.guid
        items.image = {
          small: replaceQueryParams(items.imglink, "w", "300"),
          medium: replaceQueryParams(items.imglink, "w", "500"),
          large: replaceQueryParams(items.imglink, "w", "800"),
        }
        delete items.imglink
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
          messages: `Result of all news in Okezone News with title search: ${title}`,
          total: search.length,
          data: dataSearch,
        }

        return res.status(200).send(dataResponse)
      }
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of all news in Okezone News`,
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

  static async getNews(req: Request, res: Response) {
    try {
      const { type }: Partial<Params> = req.params
      const { title }: Partial<Title> = req.query
      let url: string
      switch (type) {
        case "bola":
          url = RSS_OKEZONE.bola
          break
        case "breaking":
          url = RSS_OKEZONE.breaking
          break
        case "celebrity":
          url = RSS_OKEZONE.celebrity
          break
        case "economy":
          url = RSS_OKEZONE.economy
          break
        case "lifestyle":
          url = RSS_OKEZONE.lifestyle
          break
        case "sport":
          url = RSS_OKEZONE.sport
          break
        case "techno":
          url = RSS_OKEZONE.techno
          break
      }
      const result = await parserRss(url, {
        item: ["imglink"],
      })
      const data = result.items.map((items) => {
        delete items.pubDate
        delete items.contentSnippet
        delete items.guid
        items.image = {
          small: replaceQueryParams(items.imglink, "w", "300"),
          medium: replaceQueryParams(items.imglink, "w", "500"),
          large: replaceQueryParams(items.imglink, "w", "800"),
        }
        delete items.imglink
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
          messages: `Result of type ${type} news in Okezone News with title search: ${title}`,
          total: search.length,
          data: dataSearch,
        }

        return res.status(200).send(dataResponse)
      }
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of type ${type} in Okezone News`,
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

export default OkezoneNews
