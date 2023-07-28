import Parser from "rss-parser";

export const parseRSS = async ({
  url,
  customFields,
}: {
  url: string;
  customFields?: { [key: string]: string[] };
}) => {
  try {
    const parser = new Parser({
      customFields: customFields,
    });
  
    const feed = await parser.parseURL(url);
    return Promise.resolve(feed);
  } catch(e) {
    return Promise.reject(e)
  }
};
