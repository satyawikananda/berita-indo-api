import { Request, Response } from 'express'

const notFound = (req: Request, res: Response) => {
    const url = req.url
    return res.status(404).send({
        code: 404,
        message: `The resource of ${url} was not found.`
    })
}

export default notFound