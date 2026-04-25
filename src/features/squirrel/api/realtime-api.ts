import { marketApi } from '@/lib/market-api'

type ApiResponse<T> = {
  code: number
  msg?: string
  data?: T
}

export type MarketScope = {
  exchangeType?: string
  exchangeBiz?: string
  base?: string
  quote?: string
}

export type LastPriceItem = {
  exchangeType: string
  exchangeBusiness?: string
  base: string
  quote: string
  price: string
  updateTime: string
}

export type MarkPriceItem = {
  exchangeType: string
  base: string
  quote: string
  price: string
  updateTime: string
}

export type FundingFeeItem = {
  exchangeType: string
  base: string
  quote: string
  feeRate: string
  fundingTime: string
  updateTime: string
}

export type OrderbookItem = {
  exchangeType: string
  exchangeBusiness?: string
  base: string
  quote: string
  asks: Record<string, number>
  bids: Record<string, number>
  updateTime?: string
}

function withDefinedParams(params: Record<string, string | undefined>) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value && value.trim() !== '')
  )
}

export function isOrderbookFilterValid(scope: MarketScope) {
  const fields = [
    scope.exchangeType,
    scope.exchangeBiz,
    scope.base,
    scope.quote,
  ].map((value) => value?.trim() ?? '')

  const filledCount = fields.filter(Boolean).length
  return filledCount === 0 || filledCount === 4
}

export async function fetchLastPrices(scope: MarketScope) {
  const response = await marketApi.get<ApiResponse<LastPriceItem[]>>(
    '/v1/api/market/realtime/lastprice',
    {
      params: withDefinedParams({
        exchangeType: scope.exchangeType,
        exchangeBiz: scope.exchangeBiz,
        base: scope.base,
        quote: scope.quote,
      }),
    }
  )

  return response.data.data ?? []
}

export async function fetchMarkPrices(scope: MarketScope) {
  const response = await marketApi.get<ApiResponse<MarkPriceItem[]>>(
    '/v1/api/market/realtime/markprice',
    {
      params: withDefinedParams({
        exchangeType: scope.exchangeType,
        base: scope.base,
        quote: scope.quote,
      }),
    }
  )

  return response.data.data ?? []
}

export async function fetchFundingFees(scope: MarketScope) {
  const response = await marketApi.get<ApiResponse<FundingFeeItem[]>>(
    '/v1/api/market/realtime/fundingfee',
    {
      params: withDefinedParams({
        exchangeType: scope.exchangeType,
        base: scope.base,
        quote: scope.quote,
      }),
    }
  )

  return response.data.data ?? []
}

export async function fetchOrderbooks(scope: MarketScope) {
  if (!isOrderbookFilterValid(scope)) {
    return []
  }

  const response = await marketApi.get<ApiResponse<OrderbookItem[]>>(
    '/v1/api/market/realtime/orderbook',
    {
      params: withDefinedParams({
        exchangeType: scope.exchangeType,
        exchangeBiz: scope.exchangeBiz,
        base: scope.base,
        quote: scope.quote,
      }),
    }
  )

  return response.data.data ?? []
}
