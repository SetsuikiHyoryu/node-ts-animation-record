/**
 * 處理白絲相關的路由
 */
import { Socks } from '../types/socks/v1/socks'

export const handleSocksRoutes = (
  request: any,
  response: any
): Socks[] | undefined => {
  // 定義處理路由的邏輯
  const method: string = request?.method
  const url: string = request?.url
  const path: string = url?.split('?')[0]

  if (method === 'GET' && path === '/api/v1/socks/list') {
    const thighhighs: Socks = { type: 'thighhighs', color: 'white' }
    const pantyhose: Socks = { type: 'pantyhose', color: 'white' }
    const socks: Socks[] = [thighhighs, pantyhose]

    return socks
  }
}
