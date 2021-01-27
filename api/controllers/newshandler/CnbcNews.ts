import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_CNBC_NEWS } from '../../../const'
import { TypeCnbc } from '../../../types/common'

interface Params {
    type?: TypeCnbc
}

class CnbcNews {
    static async getNews(req: Request, res: Response) {
        try {
            const { type }: Partial<Params> = req.params
            let url = RSS_CNBC_NEWS.replace('{type}', type)
            
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                delete items.pubDate
                delete items['content:encoded']
                delete items['content:encodedSnippet']
                delete items.content
                delete items.guid
                return items
            })
            return res.status(200).send({
                code: 200,
                status: "OK",
                messages: `Result of type ${type} news in CNBC News`,
                data: data
            })
        } catch (e) {
            return res.status(500).send({
                message: `${e.message}`
            })
        }
    }

    static async getAllNews(_, res: Response) {
        try {
            let url = RSS_CNBC_NEWS.replace('/{type}', '')
            
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                delete items.pubDate
                delete items['content:encoded']
                delete items['content:encodedSnippet']
                delete items.content
                delete items.guid
                return items
            })
            return res.status(200).send({
                code: 200,
                status: "OK",
                messages: `Result of type all news in CNBC News`,
                data: data
            })
        } catch (e) {
            return res.status(500).send({
                message: `${e.message}`
            })
        }
    }
}

export default CnbcNews