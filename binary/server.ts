/**
 * 創建服務器
 */
import HTTP, { Server } from "http";
import { serverHandler } from "../src/controller/app";

const PORT: number = 8090;

const server: Server = HTTP.createServer(serverHandler);

server.listen(PORT, (): void => {
  console.log(
    `同志，你的程序已經啟動並運行在 ${PORT} 端口上： http://localhost:${PORT}/`
  );
});
