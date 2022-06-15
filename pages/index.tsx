import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { Cryptocurrencies, GlobalStats } from '../components'
import { Coin } from '../interfaces/Coin'
import { HomeProps } from '../interfaces/Home'
import { Stats } from '../interfaces/Stats'
import { getCoins } from '../services/getCoins'

const Home: NextPage<HomeProps> = (props) => {
  const { data, isLoading, isFetching } = useQuery('coins', getCoins) // adicionar {refetchInterval: 6000,}

  if(isLoading) return <TailSpin ariaLabel="loading-indicator" color='#fff' />;

  return (
    <section className='bg-background min-h-screen w-full'>
      <div className='mx-auto container'>
        <GlobalStats stats={data?.data?.stats}/>
        <Cryptocurrencies coinsList={data?.data?.coins} />
      </div>
    </section>
  )
}

export async function getServerSideProps(){
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery<HomeProps>('coins', getCoins)

  return{
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default Home
