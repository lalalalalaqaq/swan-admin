import { Users as UsersIcon } from 'lucide-react'
import { AdminPage } from '@/components/admin-page'

export function Users() {
  return (
    <AdminPage
      title='Deprecated Module'
      description='This template route is intentionally no longer part of the Swan Admin main flow.'
      icon={UsersIcon}
      sections={[
        {
          title: 'Removed from Navigation',
          description:
            'Phase 01 keeps user management out of the shell until real product scope requires it.',
        },
        {
          title: 'No Current Roadmap Slot',
          description:
            'The roadmap prioritizes authentication, tasks, and logs before any user-management UI.',
        },
        {
          title: 'Redirected by Route Layer',
          description:
            'Direct visits are redirected to the dashboard to prevent template drift.',
        },
      ]}
    />
  )
}
