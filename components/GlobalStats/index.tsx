import millify from 'millify';
import React, { useState } from 'react';
import { BiStore, BiWorld } from 'react-icons/bi';
import { BsCurrencyDollar, BsCurrencyExchange } from 'react-icons/bs';
import { FaCoins } from 'react-icons/fa';
import { GiCoins, GiReceiveMoney } from 'react-icons/gi';
import { Stats } from '../../interfaces/Stats';


interface GlobalStatsprops{
    stats: Stats
}

const GlobalStats: React.FC<GlobalStatsprops> = ({ stats }) => {
    const [globalStats, setGlobalStats] = useState<Stats>(stats)

    const globalStatsInfos = [
        {title: 'Total: ', value: `${millify(globalStats.total)}`, icon: <GiCoins color='#272343'/>},
        {title: 'Moedas: ', value: `${millify(globalStats.totalCoins)}`, icon: <FaCoins color='#272343'/>},
        {title: 'Mercados: ', value: `${millify(globalStats.totalMarkets)}`, icon: <BiStore color='#272343'/>},
        {title: 'Exchanges: ', value: `${millify(+globalStats.totalExchanges)}`, icon: <BsCurrencyExchange color='#272343'/>},
        {title: 'Total capitalização de mercado: ', value: `${millify(+globalStats.totalMarketCap)}`, icon: <GiReceiveMoney color='#272343'/>},
        {title: 'Volume total em 24h: ', value: `${millify(+globalStats.total24hVolume)}`, icon: <BsCurrencyDollar color='#272343'/>},
    ]

    return (
        <div className='w-full p-5 flex flex-col items-center justify-center'>
            <h2 className='text-white text-3xl flex gap-2 items-center mb-6 font-nunito'><BiWorld color='#272343'/> Status Global</h2>
            <div className='flex gap-6 justify-center flex-col md:flex-row md:bg-highlight rounded-md md:rounded-full drop-shadow-sm md:px-2 2xl:px-0'>
                {globalStatsInfos.map((stat) => (
                    <div className='flex justify-between items-center gap-1 px-4 md:px-2 2xl:px-4 py-2 rounded-full border border-title md:border-none' key={stat.title}>
                        <div className='flex items-center gap-2'>
                            {stat.icon}
                            <p className='text-white text-md md:text-sm 2xl:text-md font-bold font-nunito'>{stat.title}</p>
                        </div>
                        <span className='text-white text-md font-nunito'>{stat.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GlobalStats