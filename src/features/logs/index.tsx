import { ScrollText } from 'lucide-react'
import { AdminPage } from '@/components/admin-page'

export function Logs() {
  return (
    <AdminPage
      title='Logs'
      description='This page is reserved for internal audit and operator activity queries. It exists now so the shell, navigation, and review flow are ready before real log data is connected.'
      icon={ScrollText}
      sections={[
        {
          title: 'Audit Query',
          description:
            'Phase 07 will load operator actions, filters, and result pagination from swan-app-mgt.',
        },
        {
          title: 'Request Detail',
          description:
            'Payload, result, and error detail will replace this placeholder once the query surface is defined.',
        },
        {
          title: 'Review Workflow',
          description:
            'This space is reserved for the internal merge-time audit checks defined by the roadmap.',
        },
      ]}
    />
  )
}
