import {
  ArrowLeftRight,
  AudioWaveform,
  CandlestickChart,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  ListTodo,
  Logs,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: '主菜单',
      items: [
        {
          title: '工作台',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'scargil',
          url: '/scargil',
          icon: ArrowLeftRight,
        },
        {
          title: 'squirrel',
          icon: CandlestickChart,
          items: [
            {
              title: '实时行情',
              url: '/squirrel',
              icon: CandlestickChart,
            },
          ],
        },
        {
          title: '任务',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: '日志',
          url: '/logs',
          icon: Logs,
        },
      ],
    },
  ],
}
