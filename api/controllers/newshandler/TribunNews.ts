import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_TRIBUN } from '../../../const'
import { TypeTribun, DataResponse } from '../../../types/common'
import { useSearch } from '../../../utils/useSearch'
interface Params {
    type?: TypeTribun
}

interface Title {
    title: string
}

class TribunNews {
    static async getNews(req: Request, res: Response){
        try{
            const { type }: Partial<Params> = req.params
            const { title }: Partial<Title> = req.query
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
            if(title !== undefined) {
                const search = useSearch(data, title)
                let dataSearch:any = []
                search.map((items) => {
                    dataSearch.push(items.item)
                })
                const dataResponse: DataResponse = {
                    code: 200,
                    status: "OK",
                    messages: `Result of type ${type} news in Tribun News with title search: ${title}`,
                    total: search.length,
                    data: dataSearch
                }

                return res.status(200).send(dataResponse)
            }
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

    static async getAllNews(req: Request, res: Response) {
        try{
            const { title }: Partial<Title> = req.query
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
            if(title !== undefined) {
                const search = useSearch(data, title)
                let dataSearch:any = []
                search.map((items) => {
                    dataSearch.push(items.item)
                })
                const dataResponse: DataResponse = {
                    code: 200,
                    status: "OK",
                    messages: `Result of all news in Tribun News with title: ${title}`,
                    total: search.length,
                    data: dataSearch
                }

                return res.status(200).send(dataResponse)
            }
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