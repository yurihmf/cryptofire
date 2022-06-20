import api from "../config/api"

export const getCoinPriceHistory = async (id: string, timePeriod: string = '24h') => {
    const { data } = await api.get(`/coin/${id}/history?timePeriod=${timePeriod}`)
    return data
}