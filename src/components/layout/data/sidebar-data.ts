import { LayoutDashboard, ListTodo, ScrollText } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Internal Operator',
    email: 'internal@swan.local',
    avatar: '/avatars/01.png',
  },
  navGroups: [
    {
      title: 'Core',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Tasks',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'Logs',
          url: '/logs',
          icon: ScrollText,
        },
      ],
    },
  ],
}
