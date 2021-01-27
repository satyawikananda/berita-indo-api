import Parser from 'rss-parser'

interface CustomFields {
    [key:string] : Array<string>
}

export const parserRss = async (url: string, customFields?: CustomFields) => {
    const parser = new Parser({
        customFields: customFields
    })

    const feed = await parser.parseURL(url)
    return Promise.resolve(feed)
}