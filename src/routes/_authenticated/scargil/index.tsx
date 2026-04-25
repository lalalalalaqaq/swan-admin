import { createFileRoute } from '@tanstack/react-router'
import { Scargil } from '@/features/scargil'

export const Route = createFileRoute('/_authenticated/scargil/')({
  component: Scargil,
})
