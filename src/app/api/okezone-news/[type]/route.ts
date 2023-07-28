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

type ParamsOkezone = {
  breaking: string;
  news: string;
  sport: string;
  economy: string;
  lifestyle: string;
  celebrity: string;
  bola: string;
  techno: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const OKEZONE_NEWS_RSS = {
      breaking: "https://sindikasi.okezone.com/index.php/rss/0/RSS2.0",
      news: "https://sindikasi.okezone.com/index.php/rss/1/RSS2.0",
      sport: "https://sindikasi.okezone.com/index.php/rss/2/RSS2.0",
      economy: "https://sindikasi.okezone.com/index.php/rss/11/RSS2.0",
      lifestyle: "https://sindikasi.okezone.com/index.php/rss/12/RSS2.0",
      celebrity: "https://sindikasi.okezone.com/index.php/rss/13/RSS2.0",
      bola: "https://sindikasi.okezone.com/index.php/rss/14/RSS2.0",
      techno: "https://sindikasi.okezone.com/index.php/rss/16/RSS2.0",
    };

    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: OKEZONE_NEWS_RSS[params.type as keyof ParamsOkezone],
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

    let responseData: ResponseData = {
      message: `Result of type ${params.type} news in Okezone News`,
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        message: `Result of type ${params.type} news in Okezone News with title search: ${searchParams}`,
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
