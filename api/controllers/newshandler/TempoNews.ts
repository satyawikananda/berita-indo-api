import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_TEMPO_NEWS } from '../../../const'
import { TypeTempo, DataResponse } from '../../../types/common'
import { useSearch } from '../../../utils/useSearch'

interface Params {
    type?: TypeTempo
}

interface Title {
    title: string
}

class TempoNews {
    static async getNews(req: Request, res: Response) {
        try {
            const { type }: Partial<Params> = req.params
            const { title }: Partial<Title> = req.query
            let url = `${RSS_TEMPO_NEWS}${type}`
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                delete items.contentSnippet
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
                    messages: `Result of type ${type} news in Tempo News with title search: ${title}`,
                    total: search.length,
                    data: dataSearch
                }

                return res.status(200).send(dataResponse)
            }
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
    static async getAllNews(req: Request, res: Response) {
        try {
            const url = RSS_TEMPO_NEWS
            const { title }: Partial<Title> = req.query
            const result = await parserRss(url)
            const data = result.items.map((items) => {
                delete items.contentSnippet
                delete items.pubDate
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
                    messages: `Result of all news in Tempo News with title search: ${title}`,
                    total: search.length,
                    data: dataSearch
                }

                return res.status(200).send(dataResponse)
            }
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