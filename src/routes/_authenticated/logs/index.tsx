import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Logs } from '@/features/logs'
import { logMethods, logStatuses } from '@/features/logs/data/data'

const logsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  status: z
    .array(z.enum(logStatuses.map((status) => status.value)))
    .optional()
    .catch([]),
  method: z
    .array(z.enum(logMethods.map((method) => method.value)))
    .optional()
    .catch([]),
  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/logs/')({
  validateSearch: logsSearchSchema,
  component: Logs,
})
