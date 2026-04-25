import { useAuthStore } from '@/stores/auth-store'

const SKIP_AUTH_FLAG = import.meta.env.DEV
  && import.meta.env.VITE_SKIP_AUTH === 'true'
const DEV_ACCESS_TOKEN = import.meta.env.VITE_DEV_ACCESS_TOKEN?.trim()
const DEV_USER_NAME = import.meta.env.VITE_DEV_USER_NAME?.trim() || 'Dev Tester'
const DEV_USER_EMAIL = import.meta.env.VITE_DEV_USER_EMAIL?.trim() || 'dev@swan.local'
const DEV_USER_ROLE = import.meta.env.VITE_DEV_USER_ROLE?.trim() || 'admin'

const MOCK_USER = {
  name: DEV_USER_NAME,
  email: DEV_USER_EMAIL,
  role: [DEV_USER_ROLE],
  exp: Date.now() + 24 * 60 * 60 * 1000,
}

export function isSkipAuthEnabled() {
  return SKIP_AUTH_FLAG
}

export function ensureDevAuthSession() {
  if (!SKIP_AUTH_FLAG) return

  const { auth } = useAuthStore.getState()
  const targetToken = DEV_ACCESS_TOKEN || 'dev-skip-auth-token'

  // When skip-auth is enabled, prefer the env-provided token over any stale
  // token stored in cookies from earlier local sessions.
  if (auth.accessToken !== targetToken) {
    auth.setAccessToken(targetToken)
  }

  const currentUser = auth.user
  if (
    !currentUser
    || currentUser.name !== MOCK_USER.name
    || currentUser.role.join(',') !== MOCK_USER.role.join(',')
  ) {
    auth.setUser(MOCK_USER)
  }
}
