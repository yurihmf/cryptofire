import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { CoinDetailsProps } from '../../interfaces/CoinDetails'
import { getCoinDetail } from '../../services/getCoinDetail'
import { ParsedUrlQuery } from 'querystring'
import { CoinDetail } from '../../interfaces/CoinDetail'
import { TailSpin } from 'react-loader-spinner'
import moment from 'moment'
import Image from 'next/image'
import millify from 'millify'
import { Chart } from '../../components/'

interface IParams extends ParsedUrlQuery{
  uuid: string
}

const CoinDetails: React.FC<CoinDetailsProps> = ({ coinId }) => {
  const { data, isLoading, isFetching } = useQuery(['coinDetail',coinId], () => getCoinDetail(coinId))
  const [coin, setCoin] = useState<CoinDetail>(data?.data?.coin)
  
  if(isLoading) return <TailSpin ariaLabel="loading-indicator" color='#fff' />;
  
  return (
    <section className='container mx-auto py-10 font-nunito'>
      <div className='flex items-center'>
        <div className='w-10 h-10 mr-2'><Image src={coin.iconUrl} alt={coin.name} width='100%' height='100%'/></div>
        <h1 className='text-title text-3xl font-bold'>
          {coin.name}
        </h1>
        <span className='text-sm text-text font-light mr-2'>({coin.symbol})</span>
        <p className='text-text text-sm border-b border-color-title'>#{coin.rank}</p>
      <div className='flex gap-2 ml-12'>
        <span className='col-span-1 text-title font-nunito font-bold'>$ {millify(+coin.price, { precision: 3})}</span>
        <span className={`
              col-span-1 font-nunito font-bold justify-self-end
              ${+coin.change > 0 ? 'text-positive' : 'text-negative'}
          `}>
              {coin.change}%
          </span>
        </div>
      </div>
      <Chart id={coinId} />
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid: coinId } = context.params as IParams
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['coinDetail', coinId], () => getCoinDetail(coinId))

  return{
    props: {
      dehydratedState: dehydrate(queryClient),
      coinId
    }
  }
}

export default CoinDetails