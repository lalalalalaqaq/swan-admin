import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { MarketDetail } from '@/features/squirrel/components/market-dashboard'

const detailSearchSchema = z.object({
  exchangeType: z.string().optional().catch(undefined),
  exchangeBiz: z.string().optional().catch(undefined),
  base: z.string().optional().catch(undefined),
  quote: z.string().optional().catch(undefined),
})

export const Route = createFileRoute('/_authenticated/squirrel/$pair')({
  validateSearch: detailSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { pair } = Route.useParams()
  const search = Route.useSearch()
  const [baseFromPair = 'BTC', quoteFromPair = 'USDT'] = pair
    .split('-')
    .map((segment) => segment.toUpperCase())

  return (
    <MarketDetail
      base={search.base || baseFromPair}
      quote={search.quote || quoteFromPair}
      exchangeType={search.exchangeType}
      exchangeBiz={search.exchangeBiz}
    />
  )
}
