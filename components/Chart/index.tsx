import millify from 'millify';
import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Area, AreaChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { ChartProps, PriceFormated } from '../../interfaces/Chart';

const Chart: React.FC<ChartProps> = ({ prices, change, coinId, currentTimePeriod }) => {
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
            <div className='w-full flex justify-between flex-col md:flex-row items-center'>
                <h2 className='text-title text-2xl mb-4 md:mb-10'>Histórico de preços - {currentTimePeriod}</h2>
                <div className='flex border border-color-title rounded-md h-fit items-center'>
                    {timeOptions.map((time, index) => (
                        <Link href={`/coin/${coinId}?timePeriod=${time}`} key={index}>
                            <span className={`text-text text-md cursor-pointer px-3 py-2 first:rounded-l last:rounded-r hover:bg-highlight transition-all delay-75 w-full h-full ${time == currentTimePeriod ? 'bg-highlight' : ''}`}>
                                {time}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                width={500}
                height={300}
                data={priceHistory}
                margin={{
                    top: 15,
                    right: 30,
                    left: 30,
                    bottom: 15,
                }}
                >
                <XAxis dataKey="timestamp" interval='preserveStartEnd' minTickGap={10} tickFormatter={(timestamp) => moment(timestamp).format('MMM DD')} />
                <Area dataKey='price' stroke={`${+change > 0 ? '#055757' : '#aa3c2d'}`} fill={`${+change > 0 ? '#078080' : '#f45d48'}`} baseValue='dataMin'/>
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#000" activeDot={{ r: 10 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Chart