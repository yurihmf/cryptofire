import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart } from 'recharts';
import { ChartProps } from '../../interfaces/Chart'
import { getCoinPriceHistory } from '../../services/getCoinPriceHitory'

const Chart: React.FC<ChartProps> = ({ id }) => {
    const timePeriod = '24h'
    const { data, isLoading, isFetching } = useQuery(['coinPriceHistory',{id, timePeriod}], () => getCoinPriceHistory(id, timePeriod))
    const [priceHistory, setPriceHistory] = useState(data?.data?.history)
    // console.log('historico de preço', data.data.history);
    useEffect(() => {
        const priceWithDateFormated = data?.data?.history.map((item: { timestamp: number; price: string; }) =>  {
            let date = moment.unix(item.timestamp).format('YYYY-MM-DD HH:mm')
            // console.log(date.format('YYYY-MM-DD HH:mm'));
            
            return { price: item.price, date: date }
        })
        setPriceHistory(priceWithDateFormated)
    }, [])
    
    
    if(isLoading) return <TailSpin ariaLabel="loading-indicator" color='#000' />;
    
    return (
        <div className='w-full h-96 my-10'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={500}
                data={priceHistory}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis dataKey="price"/>
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart