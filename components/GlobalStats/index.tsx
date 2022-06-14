import React, { useState } from 'react';
import { Stats } from '../../interfaces/Stats';
import millify from 'millify';
import { FaCoins } from 'react-icons/fa'
import { GiCoins, GiReceiveMoney } from 'react-icons/gi'
import { BiStore, BiWorld } from 'react-icons/bi'
import { BsCurrencyExchange, BsCurrencyDollar } from 'react-icons/bs'


interface GlobalStatsprops{
    stats: Stats
}

const GlobalStats: React.FC<GlobalStatsprops> = ({ stats }) => {
    const [globalStats, setGlobalStats] = useState<Stats>(stats)

    const globalStatsInfos = [
        {title: 'Total: ', value: `${millify(globalStats.total)}`, icon: <GiCoins color='#fff'/>},
        {title: 'Moedas: ', value: `${millify(globalStats.totalCoins)}`, icon: <FaCoins color='#fff'/>},
        {title: 'Mercados: ', value: `${millify(globalStats.totalMarkets)}`, icon: <BiStore color='#fff'/>},
        {title: 'Exchanges: ', value: `${millify(+globalStats.totalExchanges)}`, icon: <BsCurrencyExchange color='#fff'/>},
        {title: 'Total capitalização de mercado: ', value: `${millify(+globalStats.totalMarketCap)}`, icon: <GiReceiveMoney color='#fff'/>},
        {title: 'Volume total em 24h: ', value: `${millify(+globalStats.total24hVolume)}`, icon: <BsCurrencyDollar color='#fff'/>},
    ]

    return (
        <div className='w-full p-5 flex flex-col items-center justify-center'>
            <h2 className='text-white text-3xl flex gap-2 items-center mb-6'><BiWorld color='#fff'/> Status Global</h2>
            <div className='flex gap-6 justify-center'>
                {globalStatsInfos.map((stat) => (
                    <div className='flex gap- items-center gap-1 drop-shadow-sm bg-neutral-800 px-4 py-2 rounded-full' key={stat.title}>
                        {stat.icon}
                        <p className='text-white text-md font-bold'>{stat.title}</p>
                        <span className='text-white text-md'>{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GlobalStats