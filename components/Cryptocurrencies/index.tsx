import millify from 'millify'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { LineChart, ResponsiveContainer, Line } from 'recharts'
import { Coin } from '../../interfaces/Coin'

interface CryptocurrenciesProps{
    coinsList: Coin[]
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({ coinsList}) => {
    const [coins, setCoins] = useState<Coin[]>(coinsList)
    return (
        <div className='w-full flex flex-col items-center py-10'>
            <h1 className='text-title text-5xl font-nunito mb-10 pb-2 border-b border-color-title'>Lista de preço Criptomoedas</h1>
            <div className='grid grid-cols-4 grid-rows-1 items-center gap-x-2 mb-4 w-7/12'>
                <p className='col-span-1 text-title font-nunito font-bold'>Moedas</p>
                <p className='col-span-1 text-title font-nunito font-bold'>Preço</p>
                <p className='col-span-1 text-title font-nunito font-bold'>Capitalização de Mercado</p>
                <p className='col-span-1 text-title font-nunito font-bold justify-self-end'>24H</p>
            </div>
                {coins.map((coin) => (
                    <Link href={`/coin/${coin.uuid}`} key={coin.uuid}>
                        <div className='grid grid-cols-4 grid-rows-1 items-center w-7/12 py-2 drop-shadow-md transition-all delay-75 ease-in-out  cursor-pointer hover:bg-secondary hover:px-4' >
                            <div className='flex gap-3 col-span-1 items-center text-title font-nunito'>
                                <span className='font-bold'>{coin.rank}</span>
                                <div className='w-5 h-5'>
                                    <Image src={coin.iconUrl} alt={coin.name}  width='100%' height='100%' />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='font-bold'>{coin.name}</p>
                                    <span className='text-text'>{coin.symbol}</span>
                                </div>
                            </div>
                            <span className='col-span-1 text-title font-nunito font-bold'>$ {millify(+coin.price, { precision: 3})}</span>
                            <span className='col-span-1 text-title font-nunito font-bold'>{millify(+coin.marketCap)}</span>
                            <span className={`
                                col-span-1 font-nunito font-bold justify-self-end
                                ${+coin.change > 0 ? 'text-positive' : 'text-negative'}
                            `}>
                                {coin.change}%
                            </span>
                        </div>
                    </Link>
                ))}
        </div>
    )
}

export default Cryptocurrencies