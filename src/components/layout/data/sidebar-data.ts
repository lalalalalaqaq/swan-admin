import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  ListTodo,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  UserCog,
  Warehouse,
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
          title: '店铺管理',
          url: '/stores',
          icon: Store,
        },
        {
          title: '销售管理',
          icon: ShoppingCart,
          items: [
            { title: 'Listing 列表', url: '/sales/listing' },
            { title: '平台订单列表', url: '/sales/orders' },
            { title: '售后订单', url: '/sales/after-sales' },
          ],
        },
        {
          title: '物流管理',
          url: '/logistics',
          icon: Truck,
        },
        {
          title: '采购管理',
          icon: Package,
          items: [
            { title: '采购计划', url: '/purchase/plan' },
            { title: '采购订单', url: '/purchase/orders' },
          ],
        },
        {
          title: '仓库管理',
          icon: Warehouse,
          items: [
            { title: '库存总览', url: '/warehouse/overview' },
            { title: '库存明细', url: '/warehouse/details' },
            { title: '库存单据', url: '/warehouse/documents' },
          ],
        },
        {
          title: '任务',
          url: '/tasks',
          icon: ListTodo,
        },
      ],
    },
    {
      title: '其他',
      items: [
        {
          title: '设置',
          icon: Settings,
          items: [
            {
              title: '个人资料',
              url: '/settings',
              icon: UserCog,
            },
          ],
        },
      ],
    },
  ],
}
