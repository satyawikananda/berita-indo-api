import { Response, Request } from "express"
import { parserRss } from "../../../utils/parser"
import { RSS_JAWAPOS } from "../../../const"
import { DataResponse, TypeJawaPos } from "../../../types/common"
import { useSearch } from "../../../utils/useSearch"

interface Params {
  type?: TypeJawaPos
}

interface Title {
  title: string
}

class JawaPosNews {
  static async getAllNews(req: Request, res: Response) {
    try {
      const { type }: Partial<Params> = req.params
      const { title }: Partial<Title> = req.query
      const url = RSS_JAWAPOS.replace("{type}", type ?? "")
      const result = await parserRss(url)
      const data = result.items.map((items) => {
        delete items.creator
        delete items.pubDate
        delete items.guid
        delete items.categories
        delete items.content
        delete items["content:encoded"]
        delete items["content:encodedSnippet"]
        delete items["dc:creator"]
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
          messages: `Result of type ${type} news in Jawa Pos News with title search: ${title}`,
          total: search.length,
          data: dataSearch,
        }

        return res.status(200).send(dataResponse)
      }
      const dataResponse: DataResponse = {
        code: 200,
        status: "OK",
        messages: `Result of all news in Jawa Pos News`,
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

export default JawaPosNews
