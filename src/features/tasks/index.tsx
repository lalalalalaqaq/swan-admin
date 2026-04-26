import { ListTodo } from 'lucide-react'
import { AdminPage } from '@/components/admin-page'

export function Tasks() {
  return (
    <AdminPage
      title='Tasks'
      description='This page is reserved for internal work tracking and delivery coordination. Template data has been removed so the next phase can plug into the real task model cleanly.'
      icon={ListTodo}
      sections={[
        {
          title: 'Task List',
          description:
            'Phase 06 will connect the swan-app-mgt task list, filters, and pagination.',
        },
        {
          title: 'Task Updates',
          description:
            'Create, edit, and batch actions will be introduced after the route and shell are stable.',
        },
        {
          title: 'Task Ownership',
          description:
            'Status, priority, and operational history will replace the generic template actions.',
        },
      ]}
    />
  )
}
