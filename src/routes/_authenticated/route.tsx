import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { ensureDevAuthSession, isSkipAuthEnabled } from '@/lib/auth-dev'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    if (isSkipAuthEnabled()) {
      ensureDevAuthSession()
    }

    const token = useAuthStore.getState().auth.accessToken
    if (!token?.trim()) {
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.pathname },
        replace: true,
      })
    }
  },
  component: AuthenticatedLayout,
})
