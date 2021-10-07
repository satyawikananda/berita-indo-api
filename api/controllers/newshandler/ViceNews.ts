import { Response, Request } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_VICE } from '../../../const'
import { DataResponse } from '../../../types/common'

interface Params {
    page?: string
}

const limitString = (str: string, limit: number):string => {
    const string: string = str
    const length: number = limit
    const result: string = string.length > length ? string.substring(0, length) + '....' : string;
    return result
}

class ViceNews {
    static async getAllNews(req: Request, res: Response) {
        try {
            const { page }: Partial<Params> = req.params
            const url = RSS_VICE.replace('{page}', `&page=${page}` ?? "")
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                items.image = {
                    small: items.enclosure.url
                }
                items.description = limitString(items.contentSnippet, 300)
                delete items.contentSnippet
                delete items.pubDate
                delete items.enclosure
                delete items.description
                delete items.guid
                delete items['content:encoded']
                delete items['content:encodedSnippet']
                delete items['dc:creator']
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of all news in Vice Indonesia`,
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
}

export default ViceNews