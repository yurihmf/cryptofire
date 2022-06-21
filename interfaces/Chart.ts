import { Price } from "./PriceHistory";

export interface ChartProps{
    prices: Price[]
    change: string
    coinId: string
    currentTimePeriod: string
}

export interface PriceFormated{
    price: string
    timestamp: string
}