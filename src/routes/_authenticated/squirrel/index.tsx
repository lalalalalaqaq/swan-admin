import { createFileRoute } from '@tanstack/react-router'
import { Squirrel } from '@/features/squirrel'

export const Route = createFileRoute('/_authenticated/squirrel/')({
  component: Squirrel,
})
