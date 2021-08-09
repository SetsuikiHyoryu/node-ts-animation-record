// Dependencies
import { IncomingMessage, ServerResponse } from "http";
import { Socks } from "../types/socks/v1/socks";
import { handleSocksRoutes } from "../routes/socks";

// Constants
const CLIENT_DOMAIN: string = "http://localhost:1848";

// Functions
export const serverHandler = (
  request: IncomingMessage,
  response: ServerResponse
): void => {
  // 設置響應格式
  response.setHeader("Access-Control-Allow-Origin", CLIENT_DOMAIN);
  response.setHeader("Content-Type", "application/json; charset=UTF-8");

  const socksData: Socks[] | undefined = handleSocksRoutes(request, response);

  if (socksData) {
    response.end(JSON.stringify(socksData));
  }
};
