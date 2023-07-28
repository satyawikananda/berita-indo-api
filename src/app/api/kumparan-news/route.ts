import { parseRSS, search } from "@/app/utils";
import { NextResponse, NextRequest } from "next/server";
import { Item } from "rss-parser";

export async function GET(request: NextRequest) {
  try {
    const KUMPARAN_NEWS_RSS = "https://lapi.kumparan.com/v2.0/rss/";
    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: KUMPARAN_NEWS_RSS,
    });

    const data = result.items.map((items) => {
      items.description = items.contentSnippet;
      delete items.contentSnippet;
      delete items.pubDate;
      delete items.content;
      delete items.guid;
      delete items.comments;
      delete items["dc:creator"];
      delete items["content:encoded"];
      delete items["content:encodedSnippet"];
      items.image = {
        small: items?.enclosure?.url.replace("w_480", "w_240"),
        medium: items?.enclosure?.url,
        large: items?.enclosure?.url.replace("w_480", "w_720"),
        extraLarge: items?.enclosure?.url.replace("w_480", "w_1080"),
      };
      delete items.enclosure;
      return items;
    });

    let responseData = {
      messages: "Result of all news in Kumparan News",
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        messages: `Result of all news in Kumparan News with title search: ${searchParams}`,
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
