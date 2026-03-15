import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Loader2, LogIn, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { login } from '@/features/auth/api/auth-api'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp'

const formSchema = z.object({
  username: z
    .string()
    .min(1, '请输入用户名')
    .min(2, '用户名至少 2 个字符'),
  password: z
    .string()
    .min(1, '请输入密码')
    .min(5, '密码至少 5 位'),
  otpCode: z
    .string()
    .min(6, '请输入 6 位验证码')
    .max(6, '请输入 6 位验证码'),
})

type FormValues = z.infer<typeof formSchema>

interface LoginFormProps extends React.HTMLAttributes<HTMLFormElement> {
  readonly redirectTo?: string
}

export function LoginForm(props: Readonly<LoginFormProps>) {
  const { className, redirectTo, ...rest } = props
  const navigate = useNavigate()
  const search = useSearch({ from: '/(auth)/sign-in' })
  const redirect = redirectTo ?? search.redirect
  const { auth } = useAuthStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      otpCode: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: (data: FormValues) =>
      login({
        username: data.username,
        password: data.password,
        otpCode: data.otpCode,
      }),
    onSuccess: (res, variables) => {
      if (res.code === 0) {
        const firstItem = Array.isArray(res.data) ? res.data[0] : undefined
        const item = firstItem as {
          token?: string
          userId?: number
          userName?: string
          roleCode?: string
        } | undefined
        const token = item?.token ?? ''
        auth.setAccessToken(token)
        auth.setUser({
          name: String(item?.userName ?? variables.username),
          email: '',
          role: item?.roleCode ? [item.roleCode] : ['user'],
          exp: Date.now() + 24 * 60 * 60 * 1000,
        })
        toast.success(`欢迎回来，${variables.username}！`)
        const targetPath =
          redirect && redirect !== '/sign-in' ? redirect : '/'
        navigate({ to: targetPath || '/', replace: true })
      } else {
        toast.error(res.msg ?? '登录失败')
      }
    },
    onError: (err: unknown) => {
      const msg =
        err instanceof AxiosError &&
        err.response?.data &&
        typeof err.response.data === 'object' &&
        'msg' in err.response.data
          ? String((err.response.data as { msg?: string }).msg)
          : '网络错误，请稍后重试'
      toast.error(msg)
    },
  })

  function onSubmit(data: FormValues) {
    loginMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-4', className)}
        {...rest}
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder='admin' autoComplete='username' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder='********'
                  autoComplete='current-password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='otpCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-1.5'>
                <ShieldCheck className='h-4 w-4' />
                动态验证码
              </FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>请输入 6 位 OTP 验证码</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className='mt-2'
          type='submit'
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <LogIn className='h-4 w-4' />
          )}
          登录
        </Button>
      </form>
    </Form>
  )
}
