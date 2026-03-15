import { useAuthStore } from '@/stores/auth-store'
import { ContentSection } from '../components/content-section'
import { Label } from '@/components/ui/label'

const ROLE_LABELS: Record<string, string> = {
  ADMIN: '管理员',
  DEV: '开发',
  SALES: '销售',
}

function getRoleLabel(roleCode: string) {
  return ROLE_LABELS[roleCode] ?? roleCode
}

export function SettingsProfile() {
  const user = useAuthStore((s) => s.auth.user)
  const name = user?.name ?? '—'
  const roleCode = user?.role?.[0] ?? ''
  const roleLabel = roleCode ? getRoleLabel(roleCode) : '—'

  return (
    <ContentSection
      title='个人资料'
      desc='您的账户信息（仅读）。'
    >
      <div className='space-y-6'>
        <div className='space-y-2'>
          <Label>用户名</Label>
          <p className='text-sm text-muted-foreground'>
            {name}
          </p>
        </div>
        <div className='space-y-2'>
          <Label>角色</Label>
          <p className='text-sm text-muted-foreground'>
            {roleLabel}
          </p>
        </div>
      </div>
    </ContentSection>
  )
}
