import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'

// 开发环境默认走 Vite 代理的 /api，生产环境必须通过 VITE_API_BASE_URL 指定完整后端地址
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? '/api' : '')

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().auth.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

/** Standard API response format */
export interface ApiResponse<T = unknown> {
  code: number
  msg?: string
  data?: T
}
