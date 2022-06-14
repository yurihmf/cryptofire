import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-neutral-900'>
      <div className='transition-all delay-75 ease-in-out container mx-auto flex justify-center items-center md:justify-between text-white'>
        <span className='text-xl py-3'>❤️‍🔥 CryptoFire</span>
        <nav className='hidden md:flex gap-4'>
          <Link href={`/exchanges`}>
            Exchanges
          </Link>
          <Link href={`/markets`}>
            Mercados
          </Link>
        </nav>
      </div>
      <nav className='md:hidden flex justify-center gap-4 text-white bg-neutral-800 py-2'>
          <Link href={`/exchanges`}>
            Exchanges
          </Link>
          <Link href={`/markets`}>
            Mercados
          </Link>
        </nav>
    </header>
  )
}

export default Header