import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_TRIBUN } from '../../../const'
import { TypeTribun, DataResponse } from '../../../types/common'

interface Params {
    type?: TypeTribun
}

class TribunNews {
    static async getNews(req: Request, res: Response){
        try{
            const { type }: Partial<Params> = req.params
            const url = `${RSS_TRIBUN}${type}`
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                items.image = items.enclosure.url.replace('thumbnails2', 'images')
                delete items.pubDate
                delete items.content
                delete items.guid
                delete items.enclosure
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of type ${type} news in Tribun News`,
                total: data.length,
                data: data
            }
            return res.status(200).send(dataResponse)
        } catch(e) {
            return res.status(500).send({
                message: `${e.message}`
            })
        }
    }

    static async getAllNews(_, res: Response) {
        try{
            const url = RSS_TRIBUN
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                items.image = items.enclosure.url.replace('thumbnails2', 'images')
                delete items.pubDate
                delete items.content
                delete items.guid
                delete items.enclosure
                return items
            })
            const dataResponse: DataResponse = {
                code: 200,
                status: "OK",
                messages: `Result of all news in Tribun News`,
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

export default TribunNews