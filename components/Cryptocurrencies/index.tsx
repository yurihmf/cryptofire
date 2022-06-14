import millify from 'millify'
import React, { useState } from 'react'
import { Coin } from '../../interfaces/Coin'

interface CryptocurrenciesProps{
    coinsList: Coin[]
}

const Cryptocurrencies: React.FC<CryptocurrenciesProps> = ({ coinsList}) => {
    const [coins, setCoins] = useState<Coin[]>(coinsList)
    return (
        <div className='w-full flex flex-col gap-16 items-center mt-10'>
            <h1 className='text-white text-5xl'>Cryptocurrencies</h1>
            <div className='flex flex-col w-6/12'>
                {coins.map((coin) => (
                    <div className='flex justify-between' key={coin.uuid}>
                        <span>{coin.rank}</span>
                        <img src={coin.iconUrl} alt={coin.name} className='w-5 h-5' />
                        <p>{coin.name}</p>
                        <span>{millify(+coin.price)}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cryptocurrencies