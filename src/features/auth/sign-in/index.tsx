import { useSearch } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { LoginForm } from './components/login-form'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>登录</CardTitle>
          <CardDescription>
            使用用户名、密码和动态验证码登录系统
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={redirect} />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
