import { Package } from 'lucide-react'
import { AdminPage } from '@/components/admin-page'

export function Apps() {
  return (
    <AdminPage
      title='Deprecated Module'
      description='This template route is intentionally no longer part of the Swan Admin main flow.'
      icon={Package}
      sections={[
        {
          title: 'Removed from Navigation',
          description:
            'Phase 01 trims this route out of the visible admin shell.',
        },
        {
          title: 'No Business Binding',
          description:
            'No Swan business workflow depends on the old app-integration template.',
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
