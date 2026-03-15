import { useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { logout } from '@/features/auth/api/auth-api'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog(props: Readonly<SignOutDialogProps>) {
  const { open, onOpenChange } = props
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const { auth } = useAuthStore()

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await logout()
    } catch {
      // 忽略网络错误，仍执行本地登出
    } finally {
      auth.reset()
      const redirect = location.pathname || '/'
      const search = redirect === '/' ? '' : `?redirect=${encodeURIComponent(redirect)}`
      globalThis.window.location.href = `/sign-in${search}`
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='退出登录'
      desc='确定要退出登录吗？再次使用需重新登录。'
      confirmText='退出登录'
      cancelBtnText='取消'
      destructive
      isLoading={isLoading}
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
