import { Activity, type LucideIcon } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type AdminPageSection = {
  title: string
  description: string
}

type AdminPageProps = {
  title: string
  description: string
  sections: AdminPageSection[]
  icon?: LucideIcon
}

export function AdminPage({
  title,
  description,
  sections,
  icon: Icon = Activity,
}: AdminPageProps) {
  return (
    <>
      <Header fixed>
        <Search className='me-auto' placeholder='Quick jump' />
        <ThemeSwitch />
        <ProfileDropdown />
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-col gap-3'>
          <Badge variant='outline' className='w-fit gap-2 px-3 py-1'>
            <Icon className='size-3.5' />
            Phase 01 Skeleton
          </Badge>
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>{title}</h1>
            <p className='max-w-2xl text-sm text-muted-foreground sm:text-base'>
              {description}
            </p>
          </div>
        </div>

        <div className='grid gap-4 lg:grid-cols-3'>
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className='text-base'>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='rounded-lg border border-dashed bg-muted/25 px-4 py-5 text-sm text-muted-foreground'>
                  This area is intentionally reserved for the next roadmap
                  phase.
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Main>
    </>
  )
}
