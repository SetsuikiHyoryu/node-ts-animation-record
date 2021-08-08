import HTTP from "http";
import { serverHandler } from "../app";

const PORT: number = 5000;

const server: HTTP.Server = HTTP.createServer(serverHandler);

server.listen(PORT, (): void => {
  console.log(
    `同志，你的程序已經啟動並運行在 ${PORT} 端口上： http://localhost:${PORT}/`
  );
});
