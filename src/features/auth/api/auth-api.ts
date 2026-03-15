import { api, type ApiResponse } from '@/lib/api'
import { useAuthStore } from '@/stores/auth-store'

export interface LoginRequest {
  username: string
  password: string
  otpCode: string
}

export interface LoginResponseData {
  token?: string
  accessToken?: string
  user?: {
    accountNo?: string
    username?: string
    email?: string
    role?: string[]
    exp?: number
  }
}

/** POST /api/auth/login - Returns ApiResponse, code 0 typically means success */
export async function login(data: LoginRequest) {
  const res = await api.post<ApiResponse<LoginResponseData>>(
    '/api/auth/login',
    data
  )
  return res.data
}

/** POST /api/auth/logout - 需在 Header 中携带 JWT */
export async function logout() {
  const token = useAuthStore.getState().auth.accessToken
  await api.post<ApiResponse<void>>('/api/auth/logout', undefined, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
}
