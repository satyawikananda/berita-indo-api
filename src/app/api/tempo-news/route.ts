import { parseRSS, search } from "@/app/utils";
import { NextResponse, NextRequest } from "next/server";
import { Item } from "rss-parser";

export async function GET(request: NextRequest) {
  try {
    const TEMPO_NEWS_RSS = "http://rss.tempo.co/";
    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: TEMPO_NEWS_RSS,
    });

    const data = result.items.map((items) => {
      delete items.contentSnippet;
      delete items.pubDate;
      return items;
    });

    let responseData = {
      messages: "Result of all news in Tempo News",
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        messages: `Result of all news in Tempo News with title search: ${searchParams}`,
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
