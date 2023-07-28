import { parseRSS, search } from "@/app/utils";
import { NextResponse, NextRequest } from "next/server";
import { Item } from "rss-parser";

export async function GET(request: NextRequest) {
  try {
    const VICE_NEWS_RSS = "https://www.vice.com/id/rss?locale=id_id";
    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: VICE_NEWS_RSS,
    });

    const data = result.items.map((items) => {
      items.image = items?.enclosure?.url;
      items.description = items.contentSnippet;
      delete items.contentSnippet;
      delete items.pubDate;
      delete items.enclosure;
      delete items.description;
      delete items.guid;
      delete items["content:encoded"];
      delete items["content:encodedSnippet"];
      delete items["dc:creator"];
      return items;
    });

    let responseData = {
      messages: "Result of all news in Vice News",
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        messages: `Result of all news in Vice News with title search: ${searchParams}`,
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
