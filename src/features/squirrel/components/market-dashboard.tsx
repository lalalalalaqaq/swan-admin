import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  AlertCircle,
  ArrowUpRight,
  LoaderCircle,
  RefreshCw,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SelectDropdown } from '@/components/select-dropdown'
import { cn } from '@/lib/utils'
import {
  fetchFundingFees,
  fetchLastPrices,
  fetchMarkPrices,
  fetchOrderbooks,
  type FundingFeeItem,
  type LastPriceItem,
  type MarketScope,
  type MarkPriceItem,
  type OrderbookItem,
} from '../api/realtime-api'

const exchangeTypeOptions = [
  { label: '全部', value: 'ALL' },
  { label: 'BINANCE', value: 'BINANCE' },
  { label: 'OKX', value: 'OKX' },
]

const exchangeBizOptions = [
  { label: '全部', value: 'ALL' },
  { label: 'SPOT', value: 'SPOT' },
  { label: 'FUTURE', value: 'FUTURE' },
]

type MarketBoardRow = {
  key: string
  exchangeType: string
  exchangeBiz?: string
  base: string
  quote: string
  pair: string
  lastPrice?: string
  markPrice?: string
  fundingFee?: string
  updateTime?: string
}

type MarketDetailProps = {
  base: string
  quote: string
  exchangeType?: string
  exchangeBiz?: string
}

function formatNumber(value?: string | number, digits = 6) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return '--'
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
  }).format(numeric)
}

function formatPercent(value?: string | number) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return '--'
  return `${(numeric * 100).toFixed(4)}%`
}

function formatTime(value?: string) {
  if (!value) return '--'
  const numeric = Number(value)
  const date = Number.isFinite(numeric) ? new Date(numeric) : new Date(value)
  if (Number.isNaN(date.getTime())) return '--'

  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function getPairLabel(base: string, quote: string) {
  return `${base}/${quote}`
}

function getRowKey(scope: {
  exchangeType: string
  exchangeBiz?: string
  base: string
  quote: string
}) {
  return [
    scope.exchangeType,
    scope.exchangeBiz ?? 'ALL',
    scope.base,
    scope.quote,
  ].join('-')
}

function getSlug(base: string, quote: string) {
  return `${base.toLowerCase()}-${quote.toLowerCase()}`
}

function buildDetailSearch(row: MarketBoardRow) {
  return {
    exchangeType: row.exchangeType,
    ...(row.exchangeBiz ? { exchangeBiz: row.exchangeBiz } : {}),
    base: row.base,
    quote: row.quote,
  }
}

function buildBoardRows(
  lastPrices: LastPriceItem[],
  markPrices: MarkPriceItem[],
  fundingFees: FundingFeeItem[]
) {
  const rows = new Map<string, MarketBoardRow>()

  for (const item of lastPrices) {
    const key = getRowKey({
      exchangeType: item.exchangeType,
      exchangeBiz: item.exchangeBusiness,
      base: item.base,
      quote: item.quote,
    })

    rows.set(key, {
      key,
      exchangeType: item.exchangeType,
      exchangeBiz: item.exchangeBusiness,
      base: item.base,
      quote: item.quote,
      pair: getPairLabel(item.base, item.quote),
      lastPrice: item.price,
      updateTime: item.updateTime,
    })
  }

  for (const item of markPrices) {
    const matchingKey =
      [...rows.keys()].find((key) => {
        const [exchangeType, , base, quote] = key.split('-')
        return (
          exchangeType === item.exchangeType &&
          base === item.base &&
          quote === item.quote
        )
      }) ??
      getRowKey({
        exchangeType: item.exchangeType,
        base: item.base,
        quote: item.quote,
      })

    const existing = rows.get(matchingKey)
    rows.set(matchingKey, {
      key: matchingKey,
      exchangeType: item.exchangeType,
      exchangeBiz: existing?.exchangeBiz,
      base: item.base,
      quote: item.quote,
      pair: getPairLabel(item.base, item.quote),
      lastPrice: existing?.lastPrice,
      markPrice: item.price,
      fundingFee: existing?.fundingFee,
      updateTime: item.updateTime ?? existing?.updateTime,
    })
  }

  for (const item of fundingFees) {
    const matchingKey =
      [...rows.keys()].find((key) => {
        const [exchangeType, , base, quote] = key.split('-')
        return (
          exchangeType === item.exchangeType &&
          base === item.base &&
          quote === item.quote
        )
      }) ??
      getRowKey({
        exchangeType: item.exchangeType,
        exchangeBiz: 'FUTURE',
        base: item.base,
        quote: item.quote,
      })

    const existing = rows.get(matchingKey)
    rows.set(matchingKey, {
      key: matchingKey,
      exchangeType: item.exchangeType,
      exchangeBiz: existing?.exchangeBiz ?? 'FUTURE',
      base: item.base,
      quote: item.quote,
      pair: getPairLabel(item.base, item.quote),
      lastPrice: existing?.lastPrice,
      markPrice: existing?.markPrice,
      fundingFee: item.feeRate,
      updateTime: item.updateTime ?? existing?.updateTime,
    })
  }

  return [...rows.values()].sort((a, b) => {
    const left = Number(a.lastPrice ?? a.markPrice ?? 0)
    const right = Number(b.lastPrice ?? b.markPrice ?? 0)
    return right - left
  })
}

function getMidPrice(book?: OrderbookItem) {
  if (!book) return '--'
  const asks = Object.keys(book.asks).map(Number)
  const bids = Object.keys(book.bids).map(Number)
  const bestAsk = Math.min(...asks)
  const bestBid = Math.max(...bids)
  if (!Number.isFinite(bestAsk) || !Number.isFinite(bestBid)) return '--'
  return formatNumber((bestAsk + bestBid) / 2, 2)
}

function getTopLevels(levels: Record<string, number>, side: 'asks' | 'bids') {
  return Object.entries(levels)
    .map(([price, quantity]) => ({
      price: Number(price),
      quantity: Number(quantity),
    }))
    .sort((a, b) => (side === 'asks' ? a.price - b.price : b.price - a.price))
    .slice(0, 10)
}

function Surface({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-[2.5rem] border border-black/8 bg-white shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

function FilterField({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='rounded-[0.95rem] border border-black/8 bg-white px-2.5'>
      {children}
    </div>
  )
}

function SectionLoading({ text = '正在拉取实时数据...' }: { text?: string }) {
  return (
    <div className='flex min-h-48 items-center justify-center gap-2 text-sm text-muted-foreground'>
      <LoaderCircle className='size-4 animate-spin' />
      {text}
    </div>
  )
}

function SectionError({ text }: { text: string }) {
  return (
    <Alert variant='destructive'>
      <AlertCircle />
      <AlertTitle>数据拉取失败</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  )
}

export function MarketDashboard() {
  const [draftScope, setDraftScope] = useState<MarketScope>({
    exchangeType: undefined,
    exchangeBiz: undefined,
    base: '',
    quote: '',
  })
  const [scope, setScope] = useState<MarketScope>(draftScope)

  const lastPriceQuery = useQuery({
    queryKey: ['market-lastprice-board', scope],
    queryFn: () => fetchLastPrices(scope),
    refetchInterval: 5000,
  })

  const markPriceQuery = useQuery({
    queryKey: [
      'market-markprice-board',
      scope.exchangeType,
      scope.base,
      scope.quote,
    ],
    queryFn: () => fetchMarkPrices(scope),
    refetchInterval: 5000,
  })

  const fundingFeeQuery = useQuery({
    queryKey: [
      'market-fundingfee-board',
      scope.exchangeType,
      scope.base,
      scope.quote,
    ],
    queryFn: () => fetchFundingFees(scope),
    refetchInterval: 5000,
  })

  const boardRows = useMemo(
    () =>
      buildBoardRows(
        lastPriceQuery.data ?? [],
        markPriceQuery.data ?? [],
        fundingFeeQuery.data ?? []
      ),
    [lastPriceQuery.data, markPriceQuery.data, fundingFeeQuery.data]
  )

  return (
    <div className='flex flex-1 flex-col gap-3'>
      <div className='flex flex-col gap-1 px-1 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-[-0.05em]'>Market board</h1>
        </div>
        <Badge className='w-fit rounded-full bg-primary px-3 py-1 text-primary-foreground'>
          5s Live
        </Badge>
      </div>

      <Surface className='overflow-hidden rounded-[1.75rem]'>
        <div className='border-b border-black/8 bg-[#fcfbf7] px-4 py-3 sm:px-5'>
          <div className='grid gap-2 xl:grid-cols-[1fr_1fr_0.85fr_0.85fr_auto]'>
            <FilterField>
              <SelectDropdown
                items={exchangeTypeOptions}
                isControlled
                defaultValue={draftScope.exchangeType || 'ALL'}
                onValueChange={(value) =>
                  setDraftScope((prev) => ({
                    ...prev,
                    exchangeType: value === 'ALL' ? undefined : value,
                  }))
                }
                placeholder='全部交易所'
                className='h-9 rounded-none border-0 bg-transparent px-1 text-sm shadow-none ring-0'
              />
            </FilterField>
            <FilterField>
              <SelectDropdown
                items={exchangeBizOptions}
                isControlled
                defaultValue={draftScope.exchangeBiz || 'ALL'}
                onValueChange={(value) =>
                  setDraftScope((prev) => ({
                    ...prev,
                    exchangeBiz: value === 'ALL' ? undefined : value,
                  }))
                }
                placeholder='全部业务'
                className='h-9 rounded-none border-0 bg-transparent px-1 text-sm shadow-none ring-0'
              />
            </FilterField>
            <FilterField>
              <Input
                value={draftScope.base ?? ''}
                onChange={(event) =>
                  setDraftScope((prev) => ({
                    ...prev,
                    base: event.target.value.toUpperCase(),
                    }))
                }
                placeholder='BTC'
                className='h-9 border-0 bg-transparent px-1 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-0'
              />
            </FilterField>
            <FilterField>
              <Input
                value={draftScope.quote ?? ''}
                onChange={(event) =>
                  setDraftScope((prev) => ({
                    ...prev,
                    quote: event.target.value.toUpperCase(),
                    }))
                }
                placeholder='USDT'
                className='h-9 border-0 bg-transparent px-1 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-0'
              />
            </FilterField>
            <div className='flex items-stretch gap-2 xl:justify-end'>
              <Button
                onClick={() => setScope(draftScope)}
                size='sm'
                className='min-w-20 rounded-[0.95rem] px-4 transition-transform hover:scale-[1.02] active:scale-[0.98]'
              >
                应用
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='rounded-[0.95rem] px-3 text-foreground/70 hover:bg-black/5 hover:text-foreground'
                onClick={() => {
                  const resetScope = {
                    exchangeType: undefined,
                    exchangeBiz: undefined,
                    base: '',
                    quote: '',
                  }
                  setDraftScope(resetScope)
                  setScope(resetScope)
                }}
              >
                <RefreshCw className='size-4' />
                重置
              </Button>
            </div>
          </div>
        </div>

        <div className='px-2 pb-2'>
          {lastPriceQuery.isPending ? (
            <SectionLoading />
          ) : lastPriceQuery.isError ? (
            <div className='p-4'>
              <SectionError text='请检查最新价格接口或筛选参数。' />
            </div>
          ) : (
            <Table className='min-w-[880px]'>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>
                  <TableHead className='px-3'>Pair</TableHead>
                  <TableHead>Exchange</TableHead>
                  <TableHead>Biz</TableHead>
                  <TableHead>Last</TableHead>
                  <TableHead>Mark</TableHead>
                  <TableHead>Funding</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className='px-3 text-right'>Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {boardRows.length ? (
                  boardRows.map((row) => (
                    <TableRow key={row.key} className='h-13'>
                      <TableCell className='px-3 py-2.5'>
                        <div className='font-semibold tracking-[-0.03em]'>
                          {row.pair}
                        </div>
                      </TableCell>
                      <TableCell className='py-2.5'>{row.exchangeType}</TableCell>
                      <TableCell className='py-2.5'>
                        <Badge
                          variant='outline'
                          className='rounded-full border-black/10 bg-[#fbfaf4] px-2 py-0 text-foreground'
                        >
                          {row.exchangeBiz ?? '--'}
                        </Badge>
                      </TableCell>
                      <TableCell className='py-2.5 font-semibold'>
                        {formatNumber(row.lastPrice, 2)}
                      </TableCell>
                      <TableCell className='py-2.5'>
                        {row.exchangeBiz === 'FUTURE'
                          ? formatNumber(row.markPrice, 2)
                          : '--'}
                      </TableCell>
                      <TableCell className='py-2.5'>
                        {row.exchangeBiz === 'FUTURE'
                          ? formatPercent(row.fundingFee)
                          : '--'}
                      </TableCell>
                      <TableCell className='py-2.5 text-muted-foreground'>
                        {formatTime(row.updateTime)}
                      </TableCell>
                      <TableCell className='px-3 py-2.5 text-right'>
                        <Button
                          asChild
                          variant='ghost'
                          size='sm'
                          className='rounded-full px-2.5'
                        >
                          <Link
                            to='/squirrel/$pair'
                            params={{ pair: getSlug(row.base, row.quote) }}
                            search={buildDetailSearch(row)}
                          >
                            Detail <ArrowUpRight className='size-4' />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className='h-28 text-center text-muted-foreground'
                    >
                      当前没有可展示的行情数据。
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </Surface>
    </div>
  )
}

function DetailMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className='rounded-[1rem] border border-black/8 bg-[#fcfbf7] px-4 py-3'>
      <div className='text-[11px] uppercase tracking-[0.16em] text-muted-foreground'>
        {label}
      </div>
      <div className='mt-1.5 text-lg font-semibold tracking-[-0.03em] text-foreground'>
        {value}
      </div>
    </div>
  )
}

function DepthTable({
  title,
  side,
  levels,
}: {
  title: string
  side: 'asks' | 'bids'
  levels: { price: number; quantity: number }[]
}) {
  const tone =
    side === 'asks'
      ? 'bg-rose-50 text-rose-700'
      : 'bg-emerald-50 text-emerald-700'

  return (
    <div className='rounded-[1rem] border border-black/8 bg-white p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <h4 className='text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
          {title}
        </h4>
        <Badge variant='outline' className='border-black/10 text-muted-foreground'>
          {levels.length} levels
        </Badge>
      </div>
      <div className='space-y-2'>
        {levels.map((level) => (
          <div
            key={`${title}-${level.price}`}
            className={cn(
              'flex items-center justify-between rounded-2xl px-3 py-2 text-sm',
              tone
            )}
          >
            <span>{formatNumber(level.price, 2)}</span>
            <span>{formatNumber(level.quantity, 6)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarketDetail({
  base,
  quote,
  exchangeType,
  exchangeBiz,
}: MarketDetailProps) {
  const resolvedExchangeBiz = exchangeBiz || 'SPOT'
  const isFuture = resolvedExchangeBiz === 'FUTURE'
  const scope = {
    exchangeType: exchangeType || 'BINANCE',
    exchangeBiz: resolvedExchangeBiz,
    base: base.toUpperCase(),
    quote: quote.toUpperCase(),
  }

  const lastPriceQuery = useQuery({
    queryKey: ['market-lastprice-detail', scope],
    queryFn: () => fetchLastPrices(scope),
    refetchInterval: 5000,
  })

  const markPriceQuery = useQuery({
    queryKey: [
      'market-markprice-detail',
      scope.exchangeType,
      scope.base,
      scope.quote,
    ],
    queryFn: () => fetchMarkPrices(scope),
    enabled: isFuture,
    refetchInterval: 5000,
  })

  const fundingFeeQuery = useQuery({
    queryKey: [
      'market-fundingfee-detail',
      scope.exchangeType,
      scope.base,
      scope.quote,
    ],
    queryFn: () => fetchFundingFees(scope),
    enabled: isFuture,
    refetchInterval: 5000,
  })

  const orderbookQuery = useQuery({
    queryKey: ['market-orderbook-detail', scope],
    queryFn: () => fetchOrderbooks(scope),
    refetchInterval: 5000,
  })

  const lastPrice = lastPriceQuery.data?.[0]
  const markPrice = markPriceQuery.data?.[0]
  const fundingFee = fundingFeeQuery.data?.[0]
  const orderbook = orderbookQuery.data?.[0]

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div className='flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <Link
            to='/squirrel'
            className='text-sm text-muted-foreground transition hover:text-foreground'
          >
            实时行情 / 详情
          </Link>
          <h1 className='mt-1 text-2xl font-bold tracking-[-0.05em]'>
            {getPairLabel(scope.base, scope.quote)}
          </h1>
          <p className='text-sm text-muted-foreground'>
            {scope.exchangeType} · {scope.exchangeBiz}
          </p>
        </div>
        <Badge className='w-fit rounded-full bg-primary px-3 py-1 text-primary-foreground'>
          5s Live
        </Badge>
      </div>

      {(lastPriceQuery.isPending || orderbookQuery.isPending) && <SectionLoading />}

      {(lastPriceQuery.isError || orderbookQuery.isError) && (
        <SectionError text='详情页数据拉取失败，请检查行情服务或当前交易对参数。' />
      )}

      <Surface className='overflow-hidden rounded-[1.75rem]'>
        <div className='border-b border-black/8 px-4 py-3 sm:px-5'>
          <h3 className='text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
            Overview
          </h3>
        </div>
        <div
          className={cn(
            'grid gap-3 px-4 py-4 sm:px-5',
            isFuture ? 'xl:grid-cols-4 md:grid-cols-2' : 'xl:grid-cols-3 md:grid-cols-2'
          )}
        >
          <DetailMetric label='Last price' value={formatNumber(lastPrice?.price, 2)} />
          {isFuture && (
            <DetailMetric label='Mark price' value={formatNumber(markPrice?.price, 2)} />
          )}
          {isFuture && (
            <DetailMetric label='Funding fee' value={formatPercent(fundingFee?.feeRate)} />
          )}
          <DetailMetric label='Mid price' value={getMidPrice(orderbook)} />
          <DetailMetric label='Exchange' value={scope.exchangeType} />
          <DetailMetric label='Business' value={scope.exchangeBiz} />
          <DetailMetric
            label='Updated'
            value={formatTime(lastPrice?.updateTime || markPrice?.updateTime)}
          />
          {isFuture ? (
            <DetailMetric
              label='Funding time'
              value={formatTime(fundingFee?.fundingTime)}
            />
          ) : (
            <DetailMetric label='Market type' value='Spot only' />
          )}
        </div>
      </Surface>

      <Surface className='overflow-hidden rounded-[1.75rem]'>
        <div className='border-b border-black/8 px-4 py-3 sm:px-5'>
          <div className='flex items-center justify-between gap-4'>
            <div>
              <h3 className='text-base font-semibold tracking-[-0.03em]'>Orderbook</h3>
              <p className='text-sm text-muted-foreground'>
                订单簿拆成 asks 与 bids，两侧同步刷新。
              </p>
            </div>
            <Badge variant='outline' className='border-black/10 text-muted-foreground'>
              Depth
            </Badge>
          </div>
        </div>
        <div className='grid gap-4 px-4 py-4 md:grid-cols-2 sm:px-5'>
            <DepthTable
              title='Asks'
              side='asks'
              levels={orderbook ? getTopLevels(orderbook.asks, 'asks') : []}
            />
            <DepthTable
              title='Bids'
              side='bids'
              levels={orderbook ? getTopLevels(orderbook.bids, 'bids') : []}
            />
        </div>
      </Surface>
    </div>
  )
}
