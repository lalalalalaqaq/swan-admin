import { LayoutDashboard } from 'lucide-react'
import { AdminPage } from '@/components/admin-page'

export function Dashboard() {
  return (
    <AdminPage
      title='Dashboard'
      description='This workspace is reserved for the internal overview of tasks, audit activity, and upcoming market or strategy modules.'
      icon={LayoutDashboard}
      sections={[
        {
          title: 'Operations Snapshot',
          description:
            'Phase 02 will replace this block with authenticated summary data from swan-app-mgt.',
        },
        {
          title: 'Task Momentum',
          description:
            'Phase 06 will connect real task records, filters, and status counts.',
        },
        {
          title: 'Audit Signals',
          description:
            'Phase 07 will surface recent operator actions and audit visibility.',
        },
      ]}
    />
  )
}
