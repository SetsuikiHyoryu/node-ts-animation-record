export const serverHandler = (request: any, response: any): void => {
  response.setHeader("Content-Type", "application/json");

  interface Socks {
    type: string;
    color: string;
  }

  const thighhighs: Socks = { type: "thighhighs", color: "white" };
  const responseData: any = thighhighs;

  response.end(JSON.stringify(responseData));
};
