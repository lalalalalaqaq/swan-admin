import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TasksDialogs } from './components/tasks-dialogs'
import { TasksPrimaryButtons } from './components/tasks-primary-buttons'
import { TasksProvider } from './components/tasks-provider'
import { TasksTable } from './components/tasks-table'

export function Tasks() {
  return (
    <TasksProvider>
      <Header fixed />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>任务</h2>
            <p className='text-muted-foreground'>
              加油完成任务哦
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <TasksTable />
      </Main>

      <TasksDialogs />
    </TasksProvider>
  )
}
