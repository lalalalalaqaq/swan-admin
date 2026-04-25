import { z } from 'zod'

export const taskStatusSchema = z.enum([
  'TODO',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
])

export const taskPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH'])

export const taskTagSchema = z.enum(['DOC', 'FEATURE', 'BUG'])

export const taskSchema = z.object({
  id: z.coerce.number(),
  title: z.string(),
  status: taskStatusSchema,
  tag: taskTagSchema.default('FEATURE'),
  priority: taskPrioritySchema,
})

export type Task = z.infer<typeof taskSchema>
export type TaskStatus = z.infer<typeof taskStatusSchema>
export type TaskPriority = z.infer<typeof taskPrioritySchema>
export type TaskTag = z.infer<typeof taskTagSchema>
