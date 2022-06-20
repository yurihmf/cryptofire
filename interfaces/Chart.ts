import { Price } from "./PriceHistory";

export interface ChartProps{
    prices: Price[]
    change: string
    coinId: string
}

export interface PriceFormated{
    price: string
    timestamp: string
}