import { parseRSS, replaceQueryParams, search } from "@/app/utils";
import { NextResponse, NextRequest } from "next/server";
import { Item } from "rss-parser";

export async function GET(request: NextRequest) {
  try {
    const SUARA_NEWS_RSS = "https://www.suara.com/rss/";
    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: SUARA_NEWS_RSS,
    });

    const data = result.items.map((items) => {
      const image = replaceQueryParams(
        items?.enclosure?.url as string,
        "q",
        "100"
      );
      items.title = items.title?.replace("...", "").trim();
      items.contentSnippet = items.contentSnippet?.trim();
      delete items.pubDate;
      delete items["content:encoded"];
      delete items["content:encodedSnippet"];
      delete items.content;
      delete items.guid;
      delete items.categories;
      items.image = {
        small: items?.enclosure?.url,
        large: image,
      };
      delete items.enclosure;
      return items;
    });

    let responseData = {
      messages: "Result of all news in Suara News",
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        messages: `Result of all news in Suara News with title search: ${searchParams}`,
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
