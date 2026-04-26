import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@/features/auth/sign-in'
import { redirectIfAuthenticated } from '@/routes/-route-utils'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: redirectIfAuthenticated,
  component: SignIn,
  validateSearch: searchSchema,
})
