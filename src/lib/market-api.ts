import axios from 'axios'

const MARKET_API_BASE_URL =
  import.meta.env.VITE_MARKET_API_BASE_URL ??
  (import.meta.env.DEV ? '/market-api' : 'http://43.167.207.108:19090')

export const marketApi = axios.create({
  baseURL: MARKET_API_BASE_URL,
  timeout: 15000,
})
