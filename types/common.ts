export type TypeCnn = "nasional" | "internasional" | "ekonomi" | "olahraga" | "teknologi" | "hiburan" | "gaya-hidup";

export type TypeCnbc = "market" | "investment" | "news" | "entrepreneur" | "syariah" | "tech" | "lifestyle"

export type TypeRepublika = "news" | "nusantara" | "khazanah" | "islam-digest" | "internasional" | "ekonomi" | "sepakbola" | "leisure"

export type TypeTempo = "nasional" | "bisnis" | "metro" | "dunia" | "bola" | "sport" | "cantik" | "tekno" | "otomotif" | "nusantara"

export type TypeAntara = "terkini" | "top-news" | "politik" | "hukum" | "ekonomi" | "metro" | "sepakbola" | "olahraga" | "humaniora" | "lifestyle" | "hiburan" | "dunia" | "infografik" | "tekno" | "otomotif" | "warta-bumi" | "rilis-pers"

export type TypeOkezone = "breaking" | "sport" | "economy" | "lifestyle" | "celebrity" | "bola" | "techno"

export type TypeBbc = "dunia" | "berita_indonesia" | "olahraga" | "majalah" | "multimedia"

export type TypeTribun = "bisnis" | "superskor" | "sport" | "seleb" | "lifestyle" | "travel" | "parapuan" | "otomotif" | "techno" | "ramadan"

export type ZoneTribun = "jakarta" | "jabar" | "mataram" | "mataraman" | "medan" | "padang" | "flores" | "sulbar" | "ambon" |
    "wartakota" | "bogor" | "pantura" | "madura" | "palembang" | "pekanbaru" | "banjarmasin" | "pontianak" | "papua" | "bekasi" |
    "cirebon" | "jogja" | "bali" | "bangka" | "jambi" | "kaltim" | "palu" | "papuabarat" | "banten" | "jateng" | "jatim" | "aceh" |
    "batam" | "sumsel" | "kalteng" | "makassar" | "tangerang" | "solo" | "surabaya" | "prohaba" | "belitung" | "lampung" | "kaltara" |
    "lombok" | "depok" | "banyumas" | "suryamalang" | "sultra" | "babel" | "kupang" | "manado" | "ternate"

export type TypeJawaPos = "nasional" | "entertainment" | "pendidikan" | "hukum-kriminal" | "pemilihan" | "sepak-bola" | "jabodetabek" | "internasional" | "lifestyle" | "kesehatan" | "infrastruktur" | "features" | "oto-dan-tekno" | "arsitektur-dan-desain" | "art-space" | "opini" | "wisata-dan-kuliner" | "hoax-atau-bukan"
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
    example?: string
}