/** 统一管理 React Query 的 queryKey，便于缓存失效与类型提示 */
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => [...queryKeys.auth.all, 'current'] as const,
  },
  users: {
    all: ['users'] as const,
    list: (filter?: string) => [...queryKeys.users.all, 'list', filter] as const,
    detail: (id: string | number) => [...queryKeys.users.all, 'detail', id] as const,
  },
  tasks: {
    all: ['tasks'] as const,
    list: (filter?: string) => [...queryKeys.tasks.all, 'list', filter] as const,
    detail: (id: string | number) => [...queryKeys.tasks.all, 'detail', id] as const,
  },
} as const
