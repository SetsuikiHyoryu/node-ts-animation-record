/**
 * 創建服務器
 */
import { createServer, Server } from 'http'
import { connect } from 'mongoose'
import { serverHandler } from '../source/controller/app'

connect('mongodb://admin:password@mongo:27017/?authSource=admin')
  .then(() => console.log('success to connect database'))
  .catch((error) => console.log(error))

const PORT: number = 8090

const server: Server = createServer(serverHandler)

server.listen(PORT, (): void =>
  console.log(
    `同志，你的程序已經啟動並運行在 ${PORT} 端口上： http://localhost:${PORT}/`
  )
)
