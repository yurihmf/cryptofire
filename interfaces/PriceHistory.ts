export interface PriceHistory{
    change: string
    history: Price[]
}

export interface Price {
    price: string
    timestamp: number
}