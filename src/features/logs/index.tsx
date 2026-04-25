import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { LogsTable } from './components/logs-table'

export function Logs() {
  return (
    <>
      <Header fixed />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>日志</h2>
            <p className='text-muted-foreground'>系统操作与接口调用记录。</p>
          </div>
        </div>
        <LogsTable />
      </Main>
    </>
  )
}
