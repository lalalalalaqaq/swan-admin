import { z } from 'zod'

export const logSchema = z.object({
  id: z.number(),
  done: z.boolean(),
  userId: z.number().nullable(),
  username: z.string().nullable(),
  userRole: z.string().nullable(),
  op: z.string(),
  desc: z.string().nullable(),
  method: z.string(),
  uri: z.string(),
  payload: z.string().nullable(),
  result: z.string().nullable(),
  error: z.string().nullable(),
  createdAt: z.number(),
})

export type LogRecord = z.infer<typeof logSchema>
