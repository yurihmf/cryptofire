import api from "../config/api"

export const getCoinDetail = async (id: string) => {
    const { data } = await api.get(`/coin/${id}`)
    return data
}