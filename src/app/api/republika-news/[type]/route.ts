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
    const REPUBLIKA_NEWS_RSS = `https://www.republika.co.id/rss/{type}`;

    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: REPUBLIKA_NEWS_RSS.replace("{type}", params.type),
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

    let responseData: ResponseData = {
      message: `Result of type ${params.type} news in Republika News`,
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        message: `Result of type ${params.type} news in Republika News with title search: ${searchParams}`,
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
