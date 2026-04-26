import { Link, useSearch } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { OtpForm } from './components/otp-form'

export function Otp() {
  const { redirect } = useSearch({ from: '/(auth)/otp' })

  return (
    <AuthLayout>
      <Card className='max-w-md gap-4'>
        <CardHeader>
          <CardTitle className='text-base tracking-tight'>Verify access</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app to complete
            access to the internal console.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OtpForm redirectTo={redirect} />
        </CardContent>
        <CardFooter>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Wrong account or expired code?{' '}
            <Link
              to='/sign-in'
              className='underline underline-offset-4 hover:text-primary'
            >
              Return to sign in.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
