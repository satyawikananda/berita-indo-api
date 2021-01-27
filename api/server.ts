import express from 'express'
import cors from 'cors'
import router from './routes'

const port = 8000
const server: express.Application = express()

server.use(router)
server.use(cors())

server.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})