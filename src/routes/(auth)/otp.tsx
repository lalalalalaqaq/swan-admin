import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Otp } from '@/features/auth/otp'
import { redirectIfAuthenticated } from '@/routes/-route-utils'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/otp')({
  beforeLoad: redirectIfAuthenticated,
  component: Otp,
  validateSearch: searchSchema,
})
