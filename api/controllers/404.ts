import { Request, Response } from 'express'
import { DataResponse } from '../../types/common'

const notFound = (req: Request, res: Response) => {
    const url = req.url
    const data: DataResponse = {
        code: 404,
        messages: `The resource of ${url} was not found.`
    }
    return res.status(404).send(data)
}

export default notFound