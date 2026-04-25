import { api, type ApiResponse } from '@/lib/api'

export interface SysLogRecord {
  id: number
  done: boolean
  userId: number | null
  username: string | null
  userRole: string | null
  op: string
  desc: string | null
  method: string
  uri: string
  payload: string | null
  result: string | null
  error: string | null
  createdAt: number
}

export interface SysLogPage {
  total: number
  pages: number
  page: number
  pageSize: number
  records: SysLogRecord[]
}

export async function fetchSystemLogs(page = 1, pageSize = 10) {
  const res = await api.get<ApiResponse<SysLogPage[]>>('/sys/log/list', {
    params: { page, pageSize },
  })

  return res.data.data?.[0] ?? {
    total: 0,
    pages: 0,
    page,
    pageSize,
    records: [],
  }
}
