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
  { params }: { params: { zone: string } }
) {
  try {
    const TRIBUN_NEWS_RSS = "https://{zone}.tribunnews.com/rss/";

    const url = new URL(request.url);
    const searchParams = url.searchParams.get("search");
    const result = await parseRSS({
      url: TRIBUN_NEWS_RSS.replace("{zone}", params.zone),
    });

    const data = result.items.map((items) => {
      // some item doesn't have image
      items.image = items?.enclosure?.url.replace("thumbnails2", "images");
      delete items.pubDate;
      delete items.content;
      delete items.guid;
      delete items.enclosure;
      return items;
    });

    let responseData: ResponseData = {
      message: `Result of zone ${params.zone} news in Tribun News`,
      total: data.length,
      data,
    };

    if (searchParams) {
      const searchData = search(data, searchParams);
      let result: Item[] = [];
      searchData.map((items) => result.push(items.item));
      responseData = {
        message: `Result of zone ${params.zone} news in Tribun News with title search: ${searchParams}`,
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
