import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnalyticsChart } from './analytics-chart'

export function Analytics() {
  return (
    <div className='space-y-4'>
      <Card className='rounded-[2.5rem]'>
        <CardHeader className='gap-3 border-b border-border pb-6'>
          <CardTitle className='text-3xl font-black tracking-[-0.05em]'>
            流量与转化分析
          </CardTitle>
          <CardDescription className='text-sm leading-6'>
            观察最近一周的点击、独立访问与回访质量。
          </CardDescription>
        </CardHeader>
        <CardContent className='px-6 pt-6'>
          <AnalyticsChart />
        </CardContent>
      </Card>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card className='rounded-[2rem]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-semibold'>总点击</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M3 3v18h18' />
              <path d='M7 15l4-4 4 4 4-6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-black tracking-[-0.05em]'>1,248</div>
            <p className='text-xs text-muted-foreground'>较上周 +12.4%</p>
          </CardContent>
        </Card>
        <Card className='rounded-[2rem]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-semibold'>独立访客</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <circle cx='12' cy='7' r='4' />
              <path d='M6 21v-2a6 6 0 0 1 12 0v2' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-black tracking-[-0.05em]'>832</div>
            <p className='text-xs text-muted-foreground'>较上周 +5.8%</p>
          </CardContent>
        </Card>
        <Card className='rounded-[2rem]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-semibold'>跳出率</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <path d='M3 12h6l3 6 3-6h6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-black tracking-[-0.05em]'>42%</div>
            <p className='text-xs text-muted-foreground'>较上周 -3.2%</p>
          </CardContent>
        </Card>
        <Card className='rounded-[2rem]'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-semibold'>平均会话</CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'
            >
              <circle cx='12' cy='12' r='10' />
              <path d='M12 6v6l4 2' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-black tracking-[-0.05em]'>3m 24s</div>
            <p className='text-xs text-muted-foreground'>较上周 +18s</p>
          </CardContent>
        </Card>
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        <Card className='col-span-1 rounded-[2.5rem] lg:col-span-4'>
          <CardHeader className='gap-3'>
            <CardTitle className='text-3xl font-black tracking-[-0.05em]'>
              渠道来源
            </CardTitle>
            <CardDescription>当前带来有效流量的主要入口。</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: '直接访问', value: 512 },
                { name: 'Product Hunt', value: 238 },
                { name: 'X / Twitter', value: 174 },
                { name: '博客内容', value: 104 },
              ]}
              barClass='bg-primary'
              valueFormatter={(n) => `${n}`}
            />
          </CardContent>
        </Card>
        <Card className='col-span-1 rounded-[2.5rem] bg-secondary lg:col-span-3'>
          <CardHeader className='gap-3'>
            <CardTitle className='text-3xl font-black tracking-[-0.05em]'>
              访问设备
            </CardTitle>
            <CardDescription>当前用户访问设备分布。</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: '桌面端', value: 74 },
                { name: '移动端', value: 22 },
                { name: '平板端', value: 4 },
              ]}
              barClass='bg-[#0e0f0c]'
              valueFormatter={(n) => `${n}%`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SimpleBarList({
  items,
  valueFormatter,
  barClass,
}: {
  items: { name: string; value: number }[]
  valueFormatter: (n: number) => string
  barClass: string
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <ul className='space-y-3'>
      {items.map((i) => {
        const width = `${Math.round((i.value / max) * 100)}%`
        return (
          <li key={i.name} className='flex items-center justify-between gap-3'>
            <div className='min-w-0 flex-1'>
              <div className='mb-2 truncate text-xs font-semibold text-muted-foreground'>
                {i.name}
              </div>
              <div className='h-3 w-full rounded-full bg-muted'>
                <div
                  className={`h-3 rounded-full ${barClass}`}
                  style={{ width }}
                />
              </div>
            </div>
            <div className='ps-2 text-xs font-semibold tabular-nums'>
              {valueFormatter(i.value)}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
