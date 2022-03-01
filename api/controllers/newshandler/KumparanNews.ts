import { Response, Request } from "express"
import { parserRss } from "../../../utils/parser"
import { RSS_KUMPARAN_NEWS } from "../../../const"
import { DataResponse } from "../../../types/common"
import { useSearch } from "../../../utils/useSearch"

interface Title {
  title: string
}
class KumparanNews {
  static async getAllNews(req: Request, res: Response) {
    try {
      const { title }: Partial<Title> = req.query
      const url = RSS_KUMPARAN_NEWS
      const result = await parserRss(url)
      const data = result.items.map((items) => {
        items.description = items.contentSnippet
        delete items.contentSnippet
        delete items.pubDate
        delete items.content
        delete items.guid
        delete items.comments
        delete items["dc:creator"]
        delete items["content:encoded"]
        delete items["content:encodedSnippet"]
        items.image = {
          small: items.enclosure.url.replace("w_480", "w_240"),
          medium: items.enclosure.url,
          large: items.enclosure.url.replace("w_480", "w_720"),
          extraLarge: items.enclosure.url.replace("w_480", "w_1080"),
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
          messages: `Result of all news in Kumaparan News with title search: ${title}`,
          total: search.length,
          data: dataSearch,
        }

        return res.status(200).send(dataResponse)
      }
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of all news in Kumparan News`,
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

export default KumparanNews
