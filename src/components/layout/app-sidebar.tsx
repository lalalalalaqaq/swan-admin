import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'

export function AppSidebar() {
  const { collapsible, variant } = useLayout()
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed' && !isMobile

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <div
          className={isCollapsed
            ? 'flex h-18 items-center justify-center px-2'
            : 'flex h-18 items-center gap-2 px-4'}
        >
          <div className='flex size-10 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground shadow-sm'>
            SW
          </div>
          <div className={isCollapsed ? 'hidden' : 'min-w-0'}>
            <p className='truncate text-lg font-black tracking-[-0.05em]'>
              Swan
            </p>
            <p className='text-xs font-medium text-muted-foreground'>
              Borderless ops
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
