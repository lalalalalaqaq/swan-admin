import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  {
    name: 'Mon',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Tue',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Wed',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Thu',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Fri',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Sat',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
  {
    name: 'Sun',
    clicks: Math.floor(Math.random() * 900) + 100,
    uniques: Math.floor(Math.random() * 700) + 80,
  },
]

export function AnalyticsChart() {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id='analytics-clicks' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#9fe870' stopOpacity={0.55} />
            <stop offset='95%' stopColor='#9fe870' stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id='analytics-uniques' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#0e0f0c' stopOpacity={0.22} />
            <stop offset='95%' stopColor='#0e0f0c' stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke='rgb(14 15 12 / 0.08)' />
        <XAxis
          dataKey='name'
          stroke='#868685'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#868685'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Area
          type='monotone'
          dataKey='clicks'
          stroke='#9fe870'
          strokeWidth={2}
          fill='url(#analytics-clicks)'
        />
        <Area
          type='monotone'
          dataKey='uniques'
          stroke='#0e0f0c'
          strokeWidth={2}
          fill='url(#analytics-uniques)'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
