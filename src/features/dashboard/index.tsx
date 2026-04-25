import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { Card, CardContent } from '@/components/ui/card'

export function Dashboard() {
  return (
    <>
      <Header fixed>
        <TopNav links={topNav} />
      </Header>

      <Main className='flex min-h-[calc(100svh-4.5rem)] items-center justify-center px-4 py-6 sm:px-6'>
        <div className='w-full max-w-5xl'>
          <Card className='overflow-hidden rounded-[2.75rem] bg-[#0e0f0c] text-white'>
            <CardContent className='relative px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20'>
              <div className='absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(159,232,112,0.45),transparent_55%)] lg:block' />
              <div className='relative z-10 max-w-4xl space-y-6'>
                <h1 className='text-display-mega max-w-4xl text-white'>
                  Money Moves Faster When The Board Stays Sharp.
                </h1>
                <p className='max-w-2xl text-base text-white/72 sm:text-lg'>
                  Hunt spreads, read momentum, and stay liquid across every
                  move.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: '概览',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
]
