import { createFileRoute } from '@tanstack/react-router'
import { redirectToSignIn } from '@/routes/-route-utils'

export const Route = createFileRoute('/clerk')({
  beforeLoad: redirectToSignIn,
})
