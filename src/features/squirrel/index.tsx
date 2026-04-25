import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { MarketDashboard } from './components/market-dashboard'

export function Squirrel() {
  return (
    <>
      <Header fixed />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <MarketDashboard />
      </Main>
    </>
  )
}
