import { Item } from "rss-parser";
import { parseRSS, replaceQueryParams, search } from "@/app/utils";
import { NextResponse, NextRequest } from "next/server";

type ResponseData = {
  message: string;
  total?: number;
  data?: ({
    [key: string]: any;
  } & Item)[];
};

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const ZETIZEN_JAWAPOS_NEWS_RSS = "https://zetizen.jawapos.com/rss/{type}";

    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: ZETIZEN_JAWAPOS_NEWS_RSS.replace("{type}", params.type),
      customFields: {
        item: ["media:content"],
      },
    });

    const data = result.items.map((items) => {
      items.image = items["media:content"]["$"]["url"];
      delete items.pubDate;
      delete items.contentSnippet;
      delete items["content:encoded"];
      delete items["content:encodedSnippet"];
      delete items["dc:creator"];
      delete items["media:content"];
      return items;
    });

    let responseData: ResponseData = {
      message: `Result of type ${params.type} news in Zetizen JawaPos News`,
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        message: `Result of type ${params.type} news in Zetizen JawaPos News with title search: ${searchParams}`,
        total: searchData.length,
        data: result,
      };
    }

    return NextResponse.json(responseData);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something error",
      },
      { status: 400 }
    );
  }
}
