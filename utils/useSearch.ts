// This function use fuse library, see more in https://github.com/krisk/Fuse
import Fuse from "fuse.js"
import { Item } from "rss-parser"

type Lists = {
  [key: string]: any
} & Item[]

export const useSearch = (list: Lists, search: string) => {
  const options = {
    keys: ["title"],
  }
  const fuse = new Fuse(list, options)
  const result = fuse.search(search)
  return result
}
