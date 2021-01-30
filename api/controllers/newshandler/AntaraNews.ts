import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_ANTARA_NEWS } from '../../../const'
import { TypeAntara, DataResponse } from '../../../types/common'

interface Params {
    type?: TypeAntara
}

class AntaraNews {
    static async getNews(req: Request, res: Response) {
        try {
            const { type }: Partial<Params> = req.params
            let url = `${RSS_ANTARA_NEWS}${type}`
            
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                const image = items.content.match(/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/)[1]
                items.image = image
                items.description = items.contentSnippet
                delete items.contentSnippet
                delete items.pubDate
                delete items.guid
                delete items.content
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of type ${type} news in Antara News`,
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

export default AntaraNews