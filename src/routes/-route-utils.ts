import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'

export function requireAuth(redirectTo: string) {
  const { accessToken } = useAuthStore.getState().auth

  if (!accessToken) {
    throw redirect({
      to: '/sign-in',
      search: { redirect: redirectTo },
    })
  }
}

export function redirectIfAuthenticated() {
  const { accessToken } = useAuthStore.getState().auth

  if (accessToken) {
    throw redirect({ to: '/' })
  }
}

export function redirectToDashboard() {
  throw redirect({ to: '/' })
}

export function redirectToSignIn() {
  throw redirect({ to: '/sign-in' })
}
