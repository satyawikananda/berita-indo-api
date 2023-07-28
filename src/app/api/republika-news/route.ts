import { parseRSS, search } from "@/app/utils";
import { NextResponse, NextRequest } from "next/server";
import { Item } from "rss-parser";

export async function GET(request: NextRequest) {
  try {
    const REPUBLIKA_NEWS_RSS = "https://www.republika.co.id/rss";
    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: REPUBLIKA_NEWS_RSS,
      customFields: {
        item: ["media:content"],
      },
    });

    const data = result.items.map((items) => {
      items.description = items.contentSnippet;
      items.image = {
        small: items["media:content"]["$"]["url"],
      };
      items.title = items?.title?.trim();
      delete items["media:content"];
      delete items.contentSnippet;
      delete items.pubDate;
      delete items.content;
      delete items.guid;
      delete items.comments;
      delete items["dc:creator"];
      delete items["content:encoded"];
      delete items["content:encodedSnippet"];
      return items;
    });

    let responseData = {
      messages: "Result of all news in Republika News",
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        messages: `Result of all news in Republika News with title search: ${searchParams}`,
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
