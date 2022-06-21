import api from "../config/api"

export const getCoins = async (offset = 0) => {
    const { data } = await api.get(`/coins?limit=50&offset=${offset}`)
    return data
}