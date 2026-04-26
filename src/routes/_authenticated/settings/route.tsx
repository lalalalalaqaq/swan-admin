import { createFileRoute } from '@tanstack/react-router'
import { redirectToDashboard } from '@/routes/-route-utils'

export const Route = createFileRoute('/_authenticated/settings')({
  beforeLoad: redirectToDashboard,
})
