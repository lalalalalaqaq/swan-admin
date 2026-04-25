import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

export function Scargil() {
  return (
    <>
      <Header fixed />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>scargil</h2>
            <p className='text-muted-foreground'>Scargil workspace overview.</p>
          </div>
        </div>
      </Main>
    </>
  )
}
