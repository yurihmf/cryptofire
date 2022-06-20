import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { CoinDetailsProps } from '../../interfaces/CoinDetails'
import { getCoinDetail } from '../../services/getCoinDetail'
import { ParsedUrlQuery } from 'querystring'
import { CoinDetail } from '../../interfaces/CoinDetail'
import moment from 'moment'
import Image from 'next/image'
import millify from 'millify'
import { Chart } from '../../components/'
import { getCoinPriceHistory } from '../../services/getCoinPriceHitory'
import { PriceHistory } from '../../interfaces/PriceHistory'

interface IParams extends ParsedUrlQuery{
  uuid: string
  timePeriod: string
}

const CoinDetails: React.FC<CoinDetailsProps> = ({ data, priceHistory }) => {
  const [coin, setCoin] = useState<CoinDetail>(data?.coin)
  const [prices, setPrices] = useState<PriceHistory>(priceHistory)
  
  return (
    <section className='container mx-auto py-10 font-nunito'>
      <div className='flex items-center'>
        <div className='w-10 h-10 mr-2'><Image src={coin.iconUrl} alt={coin.name} width='100%' height='100%'/></div>
        <h1 className='text-title text-3xl font-bold h-full'>
          {coin.name}
        </h1>
        <span className='text-sm text-text font-light mr-2 h-full'>({coin.symbol})</span>
        <p className='text-text text-sm border-b border-color-title h-full'>#{coin.rank}</p>
      <div className='flex gap-3 items-end ml-12 h-full'>
        <span className='col-span-1 text-title text-xl font-nunito font-bold h-full'>$ {millify(+coin.price, { precision: 3})}</span>
        <span className={`
              col-span-1 font-nunito font-bold justify-self-end
              ${+coin.change > 0 ? 'text-positive' : 'text-negative'}
          `}>
              {coin.change}%
          </span>
        </div>
      </div>
      <Chart prices={prices.history} change={prices.change} coinId={data?.coin?.uuid}/>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid: coinId, timePeriod } = context.query as IParams
  const { data } = await getCoinDetail(coinId)
  const { data: priceHistory } = await getCoinPriceHistory(coinId, timePeriod)

  return{
    props: {
      coinId,
      data,
      priceHistory
    }
  }
}

export default CoinDetails