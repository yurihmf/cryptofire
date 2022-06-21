export interface CoinDetail{
    allTimeHigh: {
        price: string, 
        timestamp: number
    }
    btcPrice: string
    change: string
    coinrankingUrl: string
    color: string
    description: string
    iconUrl: string
    links: ILink[]
    listedAt: number
    lowVolume: boolean
    marketCap: string
    name: string
    numberOfExchanges: number
    numberOfMarkets: number
    price: string
    priceAt: number
    rank: number
    sparkline: string[]
    supply: {
        confirmed: boolean 
        total: string 
        circulating: string
    }
    symbol: string
    tier: number
    uuid: string
    websiteUrl: string
}

export interface ILink{
    name: string
    type: string
    url: string
}