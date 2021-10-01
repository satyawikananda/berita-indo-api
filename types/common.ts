export type TypeCnn = "nasional" | "internasional" | "ekonomi" | "olahraga" | "teknologi" | "hiburan" | "gaya-hidup";

export type TypeCnbc = "market" | "investment" | "news" | "entrepreneur" | "syariah" | "tech" | "lifestyle"

export type TypeRepublika = "news" | "nusantara" | "khazanah" | "islam-digest" | "internasional" | "ekonomi" | "sepakbola" | "leisure"

export type TypeTempo = "nasional" | "bisnis" | "metro" | "dunia" | "bola" | "sport" | "cantik" | "tekno" | "otomotif" | "nusantara"

export type TypeAntara = "terkini" | "top-news" | "politik" | "hukum" | "ekonomi" | "metro" | "sepakbola" | "olahraga" | "humaniora" | "lifestyle" | "hiburan" | "dunia" | "infografik" | "tekno" | "otomotif" | "warta-bumi" | "rilis-pers"

export type TypeOkezone = "breaking" | "sport" | "economy" | "lifestyle" | "celebrity" | "bola" | "techno"

export type TypeBbc = "dunia" | "berita_indonesia" | "olahraga" | "majalah" | "multimedia"

export type TypeTribun = "bisnis" | "superskor" | "sport" | "seleb" | "lifestyle" | "travel" | "parapuan" | "otomotif" | "techno" | "ramadan" | "weather"

export interface DataResponse {
    code: number
    status?: string
    messages: string
    total?: number
    data?: unknown
}

export interface ListsApi {
    label: string
    all?: string
    type?: string
    listType?: string[]
    example?:string
}
