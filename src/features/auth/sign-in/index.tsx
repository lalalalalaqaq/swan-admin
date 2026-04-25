import { useSearch } from '@tanstack/react-router'
import { AuthLayout } from '../auth-layout'
import { LoginForm } from './components/login-form'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })

  return (
    <AuthLayout>
      <LoginForm redirectTo={redirect} />
    </AuthLayout>
  )
}
