import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_TEMPO_NEWS } from '../../../const'
import { TypeTempo, DataResponse } from '../../../types/common'

interface Params {
    type?: TypeTempo
}

class TempoNews {
    static async getNews(req: Request, res: Response) {
        try {
            const { type }: Partial<Params> = req.params
            let url = `${RSS_TEMPO_NEWS}${type}`
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                delete items.contentSnippet
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of type ${type} news in Tempo News`,
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
            let url = RSS_TEMPO_NEWS
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                delete items.contentSnippet
                delete items.pubDate
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of all news in Tempo News`,
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

export default TempoNews