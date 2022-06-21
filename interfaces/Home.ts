import { Coin } from "./Coin";
import { Stats } from "./Stats";

export interface HomeProps{
    data: {
        coins: Coin[]
        stats: Stats
    }
    currentPage: number
}
