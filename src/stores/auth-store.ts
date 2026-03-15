import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN = 'thisisjustarandomstring'
const AUTH_USER = 'auth-user'

interface AuthUser {
  name: string
  email: string
  role: string[]
  exp: number
}

function loadUser(): AuthUser | null {
  try {
    const raw = getCookie(AUTH_USER)
    if (!raw) return null
    const parsed = JSON.parse(decodeURIComponent(raw)) as AuthUser
    return parsed && typeof parsed.name === 'string' ? parsed : null
  } catch {
    return null
  }
}

function saveUser(user: AuthUser | null) {
  if (user) {
    setCookie(AUTH_USER, encodeURIComponent(JSON.stringify(user)))
  } else {
    removeCookie(AUTH_USER)
  }
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = getCookie(ACCESS_TOKEN)
  const initToken = cookieState ? JSON.parse(cookieState) : ''
  const initUser = initToken ? loadUser() : null

  return {
    auth: {
      user: initUser,
      setUser: (user) =>
        set((state) => {
          saveUser(user)
          return { ...state, auth: { ...state.auth, user } }
        }),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          setCookie(ACCESS_TOKEN, JSON.stringify(accessToken))
          return { ...state, auth: { ...state.auth, accessToken } }
        }),
      resetAccessToken: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          removeCookie(AUTH_USER)
          return { ...state, auth: { ...state.auth, accessToken: '', user: null } }
        }),
      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          removeCookie(AUTH_USER)
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' },
          }
        }),
    },
  }
})
