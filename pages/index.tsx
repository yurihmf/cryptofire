import type { GetServerSideProps, NextPage } from 'next'
import { Cryptocurrencies, GlobalStats } from '../components'
import { HomeProps } from '../interfaces/Home'
import { getCoins } from '../services/getCoins'

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <section className='bg-background min-h-screen w-full'>
      <div className='mx-auto container'>
        <GlobalStats stats={data?.stats}/>
        <Cryptocurrencies coinsList={data?.coins} />
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await getCoins()

  return{
    props: {
      data
    }
  }
}

export default Home
