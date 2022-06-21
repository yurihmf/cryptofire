import type { GetServerSideProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Cryptocurrencies, GlobalStats } from '../components'
import { HomeProps } from '../interfaces/Home'
import { getCoins } from '../services/getCoins'

interface IParams extends ParsedUrlQuery{
  page: string
}

const Home: NextPage<HomeProps> = ({ data, currentPage }) => {
  
  return (
    <section className='bg-background min-h-screen w-full'>
      <div className='mx-auto container'>
        <GlobalStats stats={data?.stats}/>
        <Cryptocurrencies coinsList={data?.coins} currentPage={currentPage} />
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query as IParams
  const currentPage: number = page === undefined ? 1 : +page

  let offset: number = currentPage === 1 ? 0 : currentPage * 50
  if(currentPage === 2){
    offset = 50
  }
  
  const { data } = await getCoins(offset)

  return{
    props: {
      data,
      currentPage
    }
  }
}

export default Home
