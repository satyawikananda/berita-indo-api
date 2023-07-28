import { parseRSS, replaceQueryParams, search } from "@/app/utils";
import { NextResponse, NextRequest } from "next/server";
import { Item } from "rss-parser";

export async function GET(request: NextRequest) {
  try {
    const OKEZONE_NEWS_RSS =
      "https://sindikasi.okezone.com/index.php/rss/1/RSS2.0";
    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: OKEZONE_NEWS_RSS,
      customFields: {
        item: ["imglink"],
      },
    });

    const data = result.items.map((items) => {
      delete items.pubDate;
      delete items.contentSnippet;
      delete items.guid;
      items.image = {
        small: replaceQueryParams(items.imglink, "w", "300"),
        medium: replaceQueryParams(items.imglink, "w", "500"),
        large: replaceQueryParams(items.imglink, "w", "800"),
      };
      delete items.imglink;
      return items;
    });

    let responseData = {
      messages: "Result of all news in Okezone News",
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        messages: `Result of all news in Okezone News with title search: ${searchParams}`,
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
