import { createFileRoute } from '@tanstack/react-router'
import { redirectToDashboard } from '@/routes/-route-utils'

export const Route = createFileRoute('/_authenticated/chats/')({
  beforeLoad: redirectToDashboard,
})
