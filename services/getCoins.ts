import api from "../config/api"

export const getCoins = async () => {
    const { data } = await api.get('/coins?limit=50')
    return data
}