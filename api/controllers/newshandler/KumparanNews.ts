import { Response } from 'express'
import { parserRss } from '../../../utils/parser'
import { RSS_KUMPARAN_NEWS } from '../../../const'

class KumparanNews {
    static async getAllNews(_, res: Response) {
        try {
            let url = RSS_KUMPARAN_NEWS
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
                items.images = {
                    small: items.enclosure.url.replace('w_480', 'w_240'),
                    medium: items.enclosure.url,
                    large: items.enclosure.url.replace('w_480', 'w_720'),
                    extraLarge: items.enclosure.url.replace('w_480', 'w_1080')
                }
                delete items.enclosure
                return items
            })

            return res.status(200).send({
                code: 200,
                status: "OK",
                messages: `Result of all news in Kumparan News`,
                data: data
            })
        } catch (e) {
            return res.status(500).send({
                message: `${e.message}`
            })
        }
    }
}

export default KumparanNews