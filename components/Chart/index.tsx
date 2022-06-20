import millify from 'millify';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ChartProps, PriceFormated } from '../../interfaces/Chart'

const Chart: React.FC<ChartProps> = ({ prices, change, coinId }) => {
    const [priceHistory, setPriceHistory] = useState<PriceFormated[]>()
    const timeOptions = ['3h', '24h', '7d', '30d', '1y', '3y', '5y']
    
    useEffect(() => {
        const priceWithDateFormated = prices.map((item) =>  {
            let date = moment.unix(item.timestamp).format('YYYY-MM-DD HH:mm')
            
            return { price: millify(+item.price, { precision: 3, units: ['', '', '', '', '']}), timestamp: date }
        })
        
        setPriceHistory(priceWithDateFormated.reverse())
    }, [prices])
    
    return (
        <div className='w-full h-96 my-10'>
            <div className='w-full flex justify-between'>
                <h2 className='text-title text-2xl'>Histórico de preços - 24h</h2>
                <div className='flex'>
                    {timeOptions.map((time, index) => (
                        <Link href={`/coin/${coinId}?timePeriod=${time}`} key={index}>
                            <span className='text-text text-md p-2 cursor-pointer'>
                                {time}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                width={500}
                height={200}
                data={priceHistory}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5,
                }}
                >
                <XAxis dataKey="timestamp" interval={20} tickFormatter={(timestamp) => moment(timestamp).format('MMM DD')} />
                <Area dataKey='price' stroke={`${+change > 0 ? '#055757' : '#aa3c2d'}`} fill={`${+change > 0 ? '#078080' : '#f45d48'}`} baseValue='dataMin'/>
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#000" activeDot={{ r: 10 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart