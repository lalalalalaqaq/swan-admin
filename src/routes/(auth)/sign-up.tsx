import { createFileRoute } from '@tanstack/react-router'
import { redirectToSignIn } from '@/routes/-route-utils'

export const Route = createFileRoute('/(auth)/sign-up')({
  beforeLoad: redirectToSignIn,
})
