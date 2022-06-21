import millify from 'millify'
import moment from 'moment'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BiWater } from 'react-icons/bi'
import { FaBitcoin, FaCalendarDay, FaGithub, FaInstagram, FaMedal, FaReddit, FaTelegramPlane, FaTwitter } from 'react-icons/fa'
import { GiPodium } from 'react-icons/gi'
import { IoLink } from 'react-icons/io5'
import { SiHiveBlockchain } from 'react-icons/si'
import { Chart } from '../../components/'
import { CoinDetail } from '../../interfaces/CoinDetail'
import { CoinDetailsProps } from '../../interfaces/CoinDetails'
import { PriceHistory } from '../../interfaces/PriceHistory'
import { getCoinDetail } from '../../services/getCoinDetail'
import { getCoinPriceHistory } from '../../services/getCoinPriceHitory'

interface IParams extends ParsedUrlQuery{
  uuid: string
  timePeriod: string
}

const CoinDetails: React.FC<CoinDetailsProps> = ({ data, priceHistory, timePeriod }) => {
  const [coin, setCoin] = useState<CoinDetail>(data?.coin)
  const [prices, setPrices] = useState<PriceHistory>(priceHistory)

  useEffect(() => {
    setPrices(priceHistory)
  }, [priceHistory])

  const coinStatistics = [
    {icon: <AiFillDollarCircle color='#272343' size='100%'/>, title: 'Preço em Dólar', value: `$ ${millify(+coin?.price, {precision: 4})}`},
    {icon: <FaBitcoin color='#272343' size='100%' />, title: 'Preço em Bitcoin', value: `${coin?.btcPrice} BTC`},
    {icon: <GiPodium color='#272343' size='100%' />, title: 'Rank', value: coin?.rank},
    {icon: <FaCalendarDay color='#272343' size='100%' />, title: 'Listado em', value: `${moment.unix(coin?.listedAt).format('DD/MM/YYYY')}`},
    {icon: <BiWater color='#272343' size='100%' />, title: 'Capitalização de mercado', value: `$ ${millify(+coin?.marketCap, {precision: 4})}`},
    {icon: <FaMedal color='#272343' size='100%' />, title: 'Maior preço', value: `$ ${millify(+coin?.allTimeHigh?.price, {precision: 4})}`},
  ]

  const iconType = (type: string) => {
    switch(type){
      case 'telegram': 
        return <FaTelegramPlane />

      case 'reddit': 
        return <FaReddit />

      case 'github': 
        return <FaGithub />

      case 'explorer': 
        return <SiHiveBlockchain />

      case 'twitter': 
        return <FaTwitter />

      case 'instagram': 
        return <FaInstagram />
      
      default:
        return <IoLink />
    }
  }
  
  
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

      <Chart prices={prices.history} change={prices.change} coinId={data?.coin?.uuid} currentTimePeriod={timePeriod}/>

      <div className='w-full flex gap-x-32 gap-y-16 mt-32 justify-between flex-wrap'>
        <div className='w-5/12 flex flex-col p-4'>
            <h2 className='text-title text-2xl border-b border-color-title w-fit mb-6'>Informações da moeda</h2>
            <div className='flex w-full flex-col'>
              {coinStatistics?.map((item) => (
                <div className='w-full flex justify-between py-4' key={item.title}>
                  <div className='flex gap-2 items-center'>
                    <span className='w-7 h-7'>{item?.icon}</span>
                    <p className='text-lg font-bold text-title'>{item?.title}</p>
                  </div>
                  <p>{item?.value}</p>
                </div>
              ))}
            </div>
        </div>
        <div className='w-5/12 flex flex-col p-4'>
            <h2 className='text-title text-2xl border-b border-color-title w-fit'>Links</h2>
            <div className='flex w-full flex-col'>
              {coin?.links.map((link) => (
                <div className='w-full flex justify-between py-3' key={link?.url}>
                  <div className='flex gap-2 items-center'>
                    <span className='w-7 h-auto'>{iconType(link?.type)}</span>
                    <p className='text-lg font-bold text-title'>{link?.type}</p>
                  </div>
                  <Link href={link?.url}>
                    <p className='underline transition-all delay-75 hover:font-bold cursor-pointer'>{link?.name}</p>
                  </Link>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid: coinId, timePeriod = '24h' } = context.query as IParams
  const { data } = await getCoinDetail(coinId)
  const { data: priceHistory } = await getCoinPriceHistory(coinId, timePeriod)

  return{
    props: {
      coinId,
      data,
      priceHistory,
      timePeriod
    }
  }
}

export default CoinDetails