import { api, type ApiResponse } from '@/lib/api'
import {
  taskSchema,
  type Task,
  type TaskPriority,
  type TaskStatus,
  type TaskTag,
} from '../data/schema'

const taskPageSchema = taskSchema.array()

type TaskListEnvelope = {
  total: number
  pages: number
  page: number
  pageSize: number
  records: Task[]
}

type TaskListItemRaw = {
  id: number
  title: string
  status: string
  priority: string
  tag?: string
}

type TaskListRaw = {
  total?: number
  pages?: number
  page?: number
  pageSize?: number
  records?: TaskListItemRaw[]
}

type BatchUpdateStatusPayload = {
  ids: number[]
  status: TaskStatus
}

type BatchUpdatePriorityPayload = {
  ids: number[]
  priority: TaskPriority
}

export type SaveTaskPayload = {
  id?: number
  title: string
  status: TaskStatus
  tag: TaskTag
  priority: TaskPriority
}

function normalizeTask(raw: TaskListItemRaw): Task {
  return taskSchema.parse({
    id: raw.id,
    title: raw.title,
    status: raw.status,
    priority: raw.priority,
    tag: raw.tag ?? 'FEATURE',
  })
}

function unwrapTaskList(data: ApiResponse<TaskListRaw[]>) {
  const pageData = data.data?.[0]

  return {
    total: pageData?.total ?? 0,
    pages: pageData?.pages ?? 0,
    page: pageData?.page ?? 1,
    pageSize: pageData?.pageSize ?? 10,
    records: taskPageSchema.parse((pageData?.records ?? []).map(normalizeTask)),
  } satisfies TaskListEnvelope
}

export async function fetchTasks(page: number, pageSize: number) {
  const response = await api.get<ApiResponse<TaskListRaw[]>>('/sys/task/list', {
    params: { page, pageSize },
  })

  return unwrapTaskList(response.data)
}

export async function createTask(payload: SaveTaskPayload) {
  const response = await api.post<ApiResponse>('/sys/task', payload)
  return response.data
}

export async function updateTask(payload: SaveTaskPayload & { id: number }) {
  const response = await api.put<ApiResponse>('/sys/task', payload)
  return response.data
}

export async function batchUpdateTaskStatus(payload: BatchUpdateStatusPayload) {
  const response = await api.put<ApiResponse>(
    '/sys/task/batch-update-status',
    payload
  )
  return response.data
}

export async function batchUpdateTaskPriority(
  payload: BatchUpdatePriorityPayload
) {
  const response = await api.put<ApiResponse>(
    '/sys/task/batch-update-priority',
    payload
  )
  return response.data
}
