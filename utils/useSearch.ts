// This function use fuse library, see more in https://github.com/krisk/Fuse

import Fuse from 'fuse.js'

export const useSearch = (list: any, search: string) => {
    const options = {
        keys: ['title']
    }
    const fuse = new Fuse(list, options)
    const result = fuse.search(search)
    return result
}