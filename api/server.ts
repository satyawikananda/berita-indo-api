import express from 'express'
import cors from 'cors'
import router from './routes'

const port = 8000
const server: express.Application = express()

server.use(cors())
server.use(router)

server.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})