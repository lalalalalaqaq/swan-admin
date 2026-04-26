import { createFileRoute } from '@tanstack/react-router'
import { redirectToSignIn } from '@/routes/-route-utils'

export const Route = createFileRoute('/(auth)/sign-in-2')({
  beforeLoad: redirectToSignIn,
})
