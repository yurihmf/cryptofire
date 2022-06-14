import axios from "axios";

const apiHeaders = {
    'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const api = axios.create({
    baseURL: 'https://coinranking1.p.rapidapi.com',
    headers: apiHeaders
})

export default api