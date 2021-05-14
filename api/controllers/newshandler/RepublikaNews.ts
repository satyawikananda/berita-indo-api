import { Request, Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_REPUBLIKA_NEWS } from '../../../const'
import { TypeRepublika, DataResponse } from '../../../types/common'
import { useSearch } from '../../../utils/useSearch'

interface Params {
    type?: TypeRepublika
}

interface Title {
    title: string
}

class RepublikaNews {
    static async getNews(req: Request, res: Response) {
        try {
            const { type }: Partial<Params> = req.params
            const { title }: Partial<Title> = req.query
            const url = `${RSS_REPUBLIKA_NEWS}${type}`
            const result = await parserRss(url, {
                item: ['media:content']
            })
            const data = result.items.map((items) => {
                items.description = items.contentSnippet
                items.image = {
                    small: items['media:content']['$']['url']
                }
                items.title = items.title.trim()
                delete items['media:content']
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
            if(title !== undefined) {
                const search = useSearch(data, title)
                let dataSearch:any = []
                search.map((items) => {
                    dataSearch.push(items.item)
                })
                const dataResponse: DataResponse = {
                    code: 200,
                    status: "OK",
                    messages: `Result of type ${type} news in Republika News with title search: ${title}`,
                    total: search.length,
                    data: dataSearch
                }

                return res.status(200).send(dataResponse)
            }
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

    static async getAllNews(req: Request, res: Response) {
        try {
            const { title }: Partial<Title> = req.query
            const url = RSS_REPUBLIKA_NEWS
            const result = await parserRss(url, {
                item: ['media:content']
            })
            const data = result.items.map((items) => {
                items.description = items.contentSnippet
                items.image = {
                    small: items['media:content']['$']['url']
                }
                items.title = items.title.trim()
                delete items['media:content']
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
            if(title !== undefined) {
                const search = useSearch(data, title)
                let dataSearch:any = []
                search.map((items) => {
                    dataSearch.push(items.item)
                })
                const dataResponse: DataResponse = {
                    code: 200,
                    status: "OK",
                    messages: `Result of all news in Republika News with title search: ${title}`,
                    total: search.length,
                    data: dataSearch
                }

                return res.status(200).send(dataResponse)
            }
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