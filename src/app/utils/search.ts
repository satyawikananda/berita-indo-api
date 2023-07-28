import Fuse from "fuse.js";
import { Item } from "rss-parser";

type Lists = {
  [key: string]: any;
} & Item[];

export const search = (list: Lists, search: string) => {
  const options = {
    keys: ["title"]
  };
  const fuse = new Fuse(list, options);
  const result = fuse.search(search);
  return result;
};
