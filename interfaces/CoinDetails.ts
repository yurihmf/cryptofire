import { CoinDetail } from "./CoinDetail"
import { PriceHistory } from "./PriceHistory"


export interface CoinDetailsProps{
    coinId: string
    data: {
        coin: CoinDetail
    },
    priceHistory: PriceHistory
    timePeriod: string
}