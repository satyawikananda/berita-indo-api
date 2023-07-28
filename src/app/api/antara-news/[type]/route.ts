import { Item } from "rss-parser";
import { parseRSS, search } from "@/app/utils";
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
    const ANTARA_NEWS_RSS = `https://www.antaranews.com/rss/`;

    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: `${ANTARA_NEWS_RSS}${params.type}`,
    });

    const data = result.items.map((items) => {
      const image = items?.content?.match(
        /\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/
      )![1];
      items.image = image;
      items.description = items.contentSnippet?.replace("...", "").trim();
      delete items["content:encoded"];
      delete items["content:encodedSnippet"];
      delete items.contentSnippet;
      delete items.pubDate;
      delete items.guid;
      delete items.content;
      delete items.enclosure;
      return items;
    });

    let responseData: ResponseData = {
      message: `Result of type ${params.type} news in Antara News`,
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        message: `Result of type ${params.type} news in Antara News with title search: ${searchParams}`,
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
