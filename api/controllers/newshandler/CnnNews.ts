import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { replaceQueryParams } from '../../../utils/replaceQueryParams'
import { RSS_CNN_NEWS } from '../../../const'
import { TypeCnn } from '../../../types/common'

interface Params {
    type?: TypeCnn
}
class CnnNews {
    static async getNews(req: Request, res: Response) {
        try {
            const { type }: Partial<Params> = req.params
            let url = RSS_CNN_NEWS.replace('{type}', type)
            
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                const image = replaceQueryParams(items.enclosure.url, 'q', '100')
                delete items.pubDate
                delete items['content:encoded']
                delete items['content:encodedSnippet']
                delete items.content
                delete items.guid
                items.enclosure.url = image
                return items
            })
            return res.status(200).send({
                code: 200,
                status: "OK",
                messages: `Result of type ${type} news in CNN News`,
                total: data.length,
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
            let url = RSS_CNN_NEWS.replace('/{type}', '')
            
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                const image = replaceQueryParams(items.enclosure.url, 'q', '100')
                delete items.pubDate
                delete items['content:encoded']
                delete items['content:encodedSnippet']
                delete items.content
                delete items.guid
                items.enclosure.url = image
                return items
            })
            return res.status(200).send({
                code: 200,
                status: "OK",
                messages: "Result of all news in CNN News",
                total: data.length,
                data: data
            })
        } catch (e) {
            return res.status(500).send({
                message: `${e.message}`
            })
        }
    }
}

export default CnnNews