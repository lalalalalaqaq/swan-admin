import { AxiosError } from 'axios'
import {
  QueryCache,
  QueryClient,
  type QueryClientConfig,
} from '@tanstack/react-query'
import { toast } from 'sonner'
import { isSkipAuthEnabled } from '@/lib/auth-dev'
import { useAuthStore } from '@/stores/auth-store'
import { handleServerError } from '@/lib/handle-server-error'

/** 用于 401 时跳转登录页，在 main.tsx 里创建 router 后注入 */
let navigateToSignIn: ((redirect?: string) => void) | null = null

export function setQueryClientNavigate(navigate: (redirect?: string) => void) {
  navigateToSignIn = navigate
}

const queryCache = new QueryCache({
  onError: (error) => {
    if (error instanceof AxiosError) {
      const status = error.response?.status
      if (status === 401) {
        if (isSkipAuthEnabled()) {
          toast.error('当前启用了 VITE_SKIP_AUTH，已跳过登录重定向')
          return
        }

        useAuthStore.getState().auth.reset()
        toast.error('登录已过期，请重新登录')
        const redirect =
          typeof globalThis.window !== 'undefined'
            ? globalThis.window.location.pathname
            : ''
        if (navigateToSignIn) {
          navigateToSignIn(redirect)
        } else if (typeof globalThis.window !== 'undefined') {
          const q = redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''
          globalThis.window.location.href = `/sign-in${q}`
        }
      } else if (status === 500) {
        toast.error('服务器错误')
        if (
          import.meta.env.PROD &&
          typeof globalThis.window !== 'undefined'
        ) {
          globalThis.window.location.href = '/500'
        }
      }
    }
  },
})

const defaultOptions: NonNullable<QueryClientConfig['defaultOptions']> = {
  queries: {
    retry: (failureCount, error) => {
      if (import.meta.env.DEV && failureCount >= 1) return false
      if (failureCount > 3) return false
      if (
        error instanceof AxiosError &&
        [401, 403].includes(error.response?.status ?? 0)
      ) {
        return false
      }
      return true
    },
    refetchOnWindowFocus: import.meta.env.PROD,
    staleTime: 10 * 1000,
  },
  mutations: {
    onError: (error) => {
      handleServerError(error)
      if (error instanceof AxiosError && error.response?.status === 304) {
        toast.error('内容未修改')
      }
    },
  },
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions,
    queryCache,
  })
}
