import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_REPUBLIKA_NEWS } from '../../../const'
import { TypeRepublika, DataResponse } from '../../../types/common'

interface Params {
    type?: TypeRepublika
}

class RepublikaNews {
    static async getNews(req: Request, res: Response) {
        try {
            const { type }: Partial<Params> = req.params
            let url = `${RSS_REPUBLIKA_NEWS}${type}`
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                items.description = items.contentSnippet
                delete items.contentSnippet
                delete items.pubDate
                delete items.content
                delete items.guid
                delete items.comments
                delete items['dc:creator']
                delete items['content:encoded']
                delete items['content:encodedSnippet']
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of type ${type} news in Republika News`,
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

    static async getAllNews(_, res: Response) {
        try {
            let url = RSS_REPUBLIKA_NEWS
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                items.description = items.contentSnippet
                delete items.contentSnippet
                delete items.pubDate
                delete items.content
                delete items.guid
                delete items.comments
                delete items['dc:creator']
                delete items['content:encoded']
                delete items['content:encodedSnippet']
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of all news in Republika News`,
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

export default RepublikaNews