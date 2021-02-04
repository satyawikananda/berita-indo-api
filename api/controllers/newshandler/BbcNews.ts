import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_BBC } from '../../../const'
import { TypeBbc, DataResponse } from '../../../types/common'

interface Params {
    type?: TypeBbc
}

class BbcNews {
    static async getNews(req: Request, res: Response) {
        try {
            const { type }: Partial<Params> = req.params
            const url = RSS_BBC.replace('{type}', type)
            const result = await parserRss(url, {
                item: ['description']
            })
            const data = result.items.map((items) => {
                delete items.pubDate
                delete items.content
                delete items.contentSnippet
                delete items.guid
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of type ${type} news in BBC News`,
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
            const url = RSS_BBC.replace('{type}', '')
            const result = await parserRss(url, {
                item: ['description']
            })
            const data = result.items.map((items) => {
                delete items.pubDate
                delete items.content
                delete items.contentSnippet
                delete items.guid
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of all news in BBC News`,
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

export default BbcNews